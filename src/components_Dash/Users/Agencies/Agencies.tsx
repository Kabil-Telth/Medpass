import React, { useEffect, useMemo, useReducer } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { Box,  Typography } from "@mui/material";
import { getAllUser } from "../../../API/UserApi";
import CommonMRT from "../../../components/MaterialReactTable";

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

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Agent
      </Typography>
      <CommonMRT columns={agentCloumns} data={initialState.data} />
    </Box>
  );
};

export default Agencies;
