import React, { useEffect, useMemo, useReducer } from "react";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import { getAllUser } from "../../API/UserApi";
import CommonMRT from "../../components/MaterialReactTable";

const AdminPanel = () => {
  const initialState = { data: [] };

  const reducer = (state, action) => {
    switch (action.type) {
      case "multiple":
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const response = await getAllUser();
    const admins = response.results.filter(
      (item) => item.role?.toLowerCase() === "telth_admin"
    );
    dispatch({ type: "multiple", payload: { data: admins } });
  };

  const adminColumns = useMemo(
    () => [
      {
        header: "S.No",
        size: 80,
        Cell: ({ row }) => row.index + 1,
      },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "phone", header: "Phone Number" },
      {
        accessorKey: "date_joined",
        header: "DOJ",
        Cell: ({ cell }) =>
          cell.getValue() ? moment(cell.getValue()).format("DD-MM-YYYY") : "-",
      },
    ],
    []
  );

  return (
    <Box p={3}>
      <Typography variant="h6" mb={2}>
        Admin Users
      </Typography>

      <CommonMRT
        columns={adminColumns}
        data={state.data}
        onEdit={(row) => console.log("Edit:", row)}
        onDelete={(row) => console.log("Delete:", row)}
      />
    </Box>
  );
};

export default AdminPanel;
