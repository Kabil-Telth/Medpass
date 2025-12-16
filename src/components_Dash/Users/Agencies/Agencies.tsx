import { Box, Button, Typography } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import React, { useEffect, useReducer } from "react";
import { getAllUser } from "../../../API/UserApi";
import { toast } from "react-toastify";

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
        break;
    }
  };

  const [initialState, disptach] = useReducer(reducer, getInitialState());

  useEffect(() => {
    getAllAgent()
  }, [])

  const getAllAgent = async() => {
    try {
        const responseData = await getAllUser();
        const data = responseData?.results;
        if(data){
            const agentList = data.filter(element => element.role && element.role.toLowerCase() === 'agent' )
            disptach({
                type: 'multiple',
                payload: {
                    data: agentList
                }
            })
        }
    } catch (error) {
        toast.error(error?.response?.error)
    }
  }

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Agent
      </Typography>
      <MaterialReactTable
        columns={initialState.columns}
        data={initialState.data}
        enableRowActions
        renderRowActions={({ row }) => (
          <Button
            variant="outlined"
            size="small"
            // onClick={() => {
            //   setSelectedApp(row.original);
            //   setOpen(true);
            // }}
          >
            View
          </Button>
        )}
        initialState={{
          pagination: { pageSize: 5, pageIndex: 0 },
          sorting: [{ id: "applied_on", desc: true }],
        }}
        muiTableBodyRowProps={({ row }) => ({
          //   onClick: () => {
          //     setSelectedApp(row.original);
          //     setOpen(true);
          //   },
          sx: { cursor: "pointer" },
        })}
      />
    </Box>
  );
};

export default Agencies;
