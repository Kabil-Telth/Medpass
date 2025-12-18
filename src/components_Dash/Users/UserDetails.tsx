import React, { useState, useEffect, Suspense, useMemo } from "react";
import {
  Search,
  Download,
  CheckCircle,
  XCircle,
  Calendar,
  Trash2,
} from "lucide-react";
import { FcInvite } from "react-icons/fc";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { usermaindashboardlist, deleteUser } from "../../API/UserApi";
import EmailRoleModal from "./EmailRoleModal";

interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

const ConfirmModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  confirmLabel?: string;
}> = ({ open, onClose, onConfirm, message, confirmLabel = "Delete" }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-3">Confirm</h3>
        <p className="text-sm text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 border rounded-md" onClick={onClose}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

const UserDetails: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingDeleteIds, setPendingDeleteIds] = useState<any[]>([]);
  const [confirmMessage, setConfirmMessage] = useState("");

  const itemsPerPage = 10;

  const fetchUsers = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res: ApiResponse<any> = await usermaindashboardlist(pageNum);
      setData(res.results);
      setCount(res.count);
      setNext(res.next);
      setPrevious(res.previous);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const columns = useMemo<MRT_ColumnDef<any>[]>(() => {
    if (data.length === 0) return [];

    const keys = Object.keys(data[0]);

    return keys.map((key) => ({
      accessorKey: key,
      header: key,
      Cell: ({ cell }) => {
        const value = cell.getValue<any>();
        if (typeof value === "boolean") {
          return value ? (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" /> True
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
              <XCircle className="w-3 h-3 mr-1" /> False
            </span>
          );
        }
        if (value === "active") {
          return (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" /> Active
            </span>
          );
        }
        if (value === "inactive") {
          return (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
              <Calendar className="w-3 h-3 mr-1" /> Inactive
            </span>
          );
        }
        return value ?? "-";
      },
    }));
  }, [data]);

  const handleSingleDeleteConfirm = (id: any, name?: string) => {
    setPendingDeleteIds([id]);
    setConfirmMessage(`Are you sure you want to delete ${name || "this user"}?`);
    setIsConfirmOpen(true);
  };

  const handleBulkDeleteConfirm = () => {
    const ids = Object.keys(rowSelection).filter((k) => rowSelection[k]);
    if (ids.length === 0) return alert("Please select at least one user");
    setPendingDeleteIds(ids);
    setConfirmMessage(`Delete ${ids.length} selected user(s)?`);
    setIsConfirmOpen(true);
  };

  const performDelete = async () => {
    setIsConfirmOpen(false);
    try {
      setLoading(true);
      await Promise.all(pendingDeleteIds.map((id) => deleteUser(id)));
      await fetchUsers(page);
      setRowSelection({});
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Details</h2>
        <div className="flex items-center gap-3">
          <div onClick={() => setOpen(true)} className="cursor-pointer">
            <FcInvite size={35} />
          </div>
          {open && (
            <Suspense fallback={<div>Loading...</div>}>
              <EmailRoleModal open={open} onClose={() => setOpen(false)} />
            </Suspense>
          )}
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      <MaterialReactTable
        columns={columns}
        data={data}
        state={{ isLoading: loading, rowSelection }}
        enableRowSelection
        onRowSelectionChange={setRowSelection}
        enablePagination={false}
        renderRowActions={({ row }) => (
          <button
            onClick={() => handleSingleDeleteConfirm(row.original.id, row.original[columns[0]?.accessorKey as string])}
            className="text-red-600 flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        )}
        renderTopToolbarCustomActions={() => (
          <button
            onClick={handleBulkDeleteConfirm}
            className="px-3 py-1 bg-red-600 text-white rounded-md"
          >
            Delete Selected
          </button>
        )}
      />

      <div className="flex justify-end gap-3">
        <button
          disabled={!previous}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1 border rounded"
        >
          Previous
        </button>
        <span>
          Page {page} of {Math.ceil(count / itemsPerPage)}
        </span>
        <button
          disabled={!next}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>

      <ConfirmModal
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={performDelete}
        message={confirmMessage}
      />
    </div>
  );
};

export default UserDetails;
