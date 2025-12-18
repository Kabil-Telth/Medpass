import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import moment from "moment";
import { toast } from "react-toastify";
import { getAllUser } from "../../../API/UserApi";
import CommonMRT from "../../../components/MaterialReactTable";
import { stdApi } from "../../../API/UserTypeApi";
import AddIcon from "@mui/icons-material/Add";
import { SectionHeader } from "../../../CommonStyle";
import EmailRoleModal from "../EmailRoleModal";

interface Student {
  id: number;
  username: string;
  email: string;
  phone: string;
  date_joined: string;
  status?: string;
}

const StudentApplicationManager = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [open, setOpen] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  let roleData = localStorage.getItem("role");

  useEffect(() => {
    let userRole = localStorage.getItem("role");
    if (userRole === "TELTH_ADMIN") {
      fetchStudents();
    } else {
      getStudent();
    }
  }, []);

  const getStudent = async () => {
    try {
      const data = await stdApi();
      setStudents(data.results);
    } catch {
      toast.error("Failed to fetch students");
    }
  };

  const fetchStudents = async () => {
    try {
      const data = await getAllUser();
      const studentUsers = data.results.filter(
        (u) => u.role?.toLowerCase() === "student"
      );
      setStudents(studentUsers);
    } catch {
      toast.error("Failed to fetch students");
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "S.No",
        size: 80,
        Cell: ({ row }) => row.index + 1,
      },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "phone", header: "Phone" },
      {
        accessorKey: "date_joined",
        header: "DOJ",
        Cell: ({ cell }) =>
          cell.getValue() ? moment(cell.getValue()).format("DD-MM-YYYY") : "-",
      },
    ],
    []
  );

  const toggleUserForm = () => {
    setShowUserForm(!showUserForm);
  };

  return (
    <Box p={3}>
      <SectionHeader>
        <Typography variant="h5" mb={2}>
          Student Applications
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={toggleUserForm}
          color={"primary"}
        >
          Add User
        </Button>
      </SectionHeader>
      <EmailRoleModal
        open={showUserForm}
        role={roleData}
        onClose={() => setShowUserForm(false)}
      />
      <CommonMRT
        columns={columns}
        data={students}
        onView={(row) => {
          setSelectedStudent(row);
          setOpen(true);
        }}
      />

      {/* View Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Student Details</DialogTitle>
        <DialogContent dividers>
          {selectedStudent && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Typography>
                <strong>Name:</strong> {selectedStudent.username}
              </Typography>
              <Typography>
                <strong>Email:</strong> {selectedStudent.email}
              </Typography>
              <Typography>
                <strong>Phone:</strong> {selectedStudent.phone}
              </Typography>
              <Typography>
                <strong>Applied On:</strong>{" "}
                {moment(selectedStudent.date_joined).format("DD-MM-YYYY")}
              </Typography>
              <Typography>
                <strong>Status:</strong> {selectedStudent.status || "Pending"}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button startIcon={<CheckCircle />} color="success">
            Approve
          </Button>
          <Button startIcon={<Cancel />} color="error">
            Reject
          </Button>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentApplicationManager;
