import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import {
  MaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
  useMaterialReactTable,
} from "material-react-table";
import React, { useEffect, useMemo, useReducer } from "react";
import { getAllUser } from "../../../API/UserApi";
import { toast } from "react-toastify";
import { Delete, Edit } from "@mui/icons-material";
import moment from "moment";

const Agencies = () => {
  const getInitialState = () => {
    const initialState = {
      data: [],
      columns: [],
    };
    return initialState;
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "multiple":
        return {
          ...state,
          ...action.payload,
        };
      case "initialState":
        return getInitialState();
      default:
        state;
    }
  };

  const [initialState, disptach] = useReducer(reducer, getInitialState());

  useEffect(() => {
    getAllAgent();
  }, []);

  const getAllAgent = async () => {
    try {
      const responseData = await getAllUser();
      const data = responseData?.results;
      if (data) {
        const agentList = data.filter(
          (element) => element.role && element.role.toLowerCase() === "agent"
        );
        disptach({
          type: "multiple",
          payload: {
            data: agentList,
          },
        });
      }
    } catch (error) {
      toast.error(error?.response?.error);
    }
  };

  const agentCloumns = useMemo(
    () => [
      {
        header: "S.No",
        size: 80,
        Cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 200,
      },
      {
        accessorKey: "phone",
        header: "Phone Number",
        size: 150,
      },
      {
        accessorKey: "date_joined",
        header: "DOJ",
        size: 150,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return value ? moment(value).format("DD-MM-YYYY") : "-";
        },
      },
    ],
    []
  );

  const userTable = useMaterialReactTable({
    columns: agentCloumns,
    data: initialState.data,
    enableRowSelection: false,
    enableColumnOrdering: true,
    enableFacetedValues: true,
    initialState: { showGlobalFilter: true },
    positionGlobalFilter: "left",
    renderTopToolbar: ({ table }) => (
      <Box
        sx={{ display: "flex", gap: "0.5rem", p: "0.5rem", flexWrap: "wrap" }}
      >
        <MRT_GlobalFilterTextField table={table} />
        <MRT_ToggleFiltersButton table={table} />
      </Box>
    ),
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", gap: "0.5rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => console.log("Edit user:", row.original)}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => console.log("Delete user:", row.original)}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    muiTablePaperProps: {
      elevation: 3,
    },
  });

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Agent
      </Typography>
      <MaterialReactTable table={userTable} />
    </Box>
  );
};

export default Agencies;
