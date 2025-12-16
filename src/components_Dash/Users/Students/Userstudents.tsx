import React, { useState, useEffect } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
// import { getApplicationsApi, updateApplicationStatusApi } from '../../API/ApplicationApi';
import { toast } from "react-toastify";
import { getAllUser } from "../../../API/UserApi";

interface Application {
  id: number;
  username: string;
  email: string;
  phone: string;
  applied_on: string;
  student_name?: string; 
  program?: string; 
  course?: string;
  status?: string;
}

const StudentApplicationManager: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await getAllUser();
      const response = data?.results || data;
      
      if (Array.isArray(response)) {
        const studentUsers = response.filter(element => 
          element.role && element.role.toLowerCase() === "student"
        );
        setApplications(studentUsers);
      }
    } catch (err) {
      console.error("Error fetching applications:", err);
      toast.error("Failed to fetch applications");
    }
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      // await updateApplicationStatusApi(id, { status });
      toast.success(`Application ${status.toLowerCase()}`);
      fetchApplications();
      setOpen(false);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const columns: MRT_ColumnDef<Application>[] = [
    { 
      accessorKey: "username", 
      header: "Student Name",
      Cell: ({ cell }) => cell.getValue() || "N/A"
    },
    { 
      accessorKey: "email", 
      header: "Email",
      Cell: ({ cell }) => cell.getValue() || "N/A"
    },
    { 
      accessorKey: "phone", 
      header: "Phone",
      Cell: ({ cell }) => cell.getValue() || "N/A"
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Student Applications
      </Typography>

      <MaterialReactTable
        columns={columns}
        data={applications}
        enableRowActions
        renderRowActions={({ row }) => (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setSelectedApp(row.original);
              setOpen(true);
            }}
          >
            View
          </Button>
        )}
        initialState={{
          pagination: { pageSize: 5, pageIndex: 0 },
          sorting: [{ id: "applied_on", desc: true }],
        }}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => {
            setSelectedApp(row.original);
            setOpen(true);
          },
          sx: { cursor: 'pointer' },
        })}
      />

      {/* Details Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Application Details</DialogTitle>
        <DialogContent dividers>
          {selectedApp && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography>
                <strong>Student Name:</strong> {selectedApp.username || selectedApp.student_name || "N/A"}
              </Typography>
              <Typography>
                <strong>Email:</strong> {selectedApp.email || "N/A"}
              </Typography>
              <Typography>
                <strong>Phone:</strong> {selectedApp.phone || "N/A"}
              </Typography>
              <Typography>
                <strong>Program:</strong> {selectedApp.program || "Not specified"}
              </Typography>
              <Typography>
                <strong>Course:</strong> {selectedApp.course || "Not specified"}
              </Typography>
              <Typography>
                <strong>Status:</strong> {selectedApp.status || "Pending"}
              </Typography>
              <Typography>
                <strong>Applied On:</strong> {selectedApp.applied_on || "N/A"}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            color="success"
            startIcon={<CheckCircle />}
            onClick={() =>
              selectedApp && handleStatusUpdate(selectedApp.id, "APPROVED")
            }
          >
            Approve
          </Button>
          <Button
            color="error"
            startIcon={<Cancel />}
            onClick={() =>
              selectedApp && handleStatusUpdate(selectedApp.id, "REJECTED")
            }
          >
            Reject
          </Button>
          <Button onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentApplicationManager;