// components/CommonMRT.tsx
import {
  MaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
  useMaterialReactTable,
} from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";

interface CommonMRTProps<T extends object> {
  columns: any[];
  data: T[];
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

const CommonMRT = <T extends object>({
  columns,
  data,
  onView,
  onEdit,
  onDelete,
}: CommonMRTProps<T>) => {
  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: false,
    enableColumnOrdering: true,
    enableFacetedValues: true,
    initialState: { showGlobalFilter: true },
    positionGlobalFilter: "left",

    renderTopToolbar: ({ table }) => (
      <Box sx={{ display: "flex", gap: "0.5rem", p: "0.5rem" }}>
        <MRT_GlobalFilterTextField table={table} />
        <MRT_ToggleFiltersButton table={table} />
      </Box>
    ),

    renderRowActions:
      onView || onEdit || onDelete
        ? ({ row }) => (
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              {onView && (
                <Tooltip title="View">
                  <IconButton onClick={() => onView(row.original)}>
                    <Visibility />
                  </IconButton>
                </Tooltip>
              )}
              {onEdit && (
                <Tooltip title="Edit">
                  <IconButton onClick={() => onEdit(row.original)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
              )}
              {onDelete && (
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => onDelete(row.original)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          )
        : undefined,

    muiTablePaperProps: { elevation: 3 },
  });

  return <MaterialReactTable table={table} />;
};

export default CommonMRT;
