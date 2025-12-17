import React, { useEffect, useMemo, useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import moment from "moment";
import { toast } from "react-toastify";
import { getAllUser } from "../../../API/UserApi";
import CommonMRT from "../../../components/MaterialReactTable";

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

  useEffect(() => {
    fetchStudents();
  }, []);

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
          cell.getValue()
            ? moment(cell.getValue()).format("DD-MM-YYYY")
            : "-",
      },
    ],
    []
  );

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Student Applications
      </Typography>

      <CommonMRT
        columns={columns}
        data={students}
        onView={(row) => {
          setSelectedStudent(row);
          setOpen(true);
        }}
      />

      {/* View Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Student Details</DialogTitle>
        <DialogContent dividers>
          {selectedStudent && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Typography><strong>Name:</strong> {selectedStudent.username}</Typography>
              <Typography><strong>Email:</strong> {selectedStudent.email}</Typography>
              <Typography><strong>Phone:</strong> {selectedStudent.phone}</Typography>
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
