import React, { useState, useMemo, useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import moment from "moment";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from "material-react-table";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import UniversityForm from "./UniversityForm";
import UserForm from "./UserForm";
import {
  deleteUnversitiesApi,
  getUniversitiesApi,
} from "../../../API/UserTypesApi";
import { MoreVerticalIcon } from "lucide-react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import EmailRoleModal from "../EmailRoleModal";
import { getAllUser } from "../../../API/UserApi";

const SectionHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
}));

function University() {
  const [value, setValue] = useState("1");
  const [showUserForm, setShowUserForm] = useState(false);
  const [showUniversityForm, setShowUniversityForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [getUniversities, setGetUniversities] = useState();
  const [showModal, setShowModal] = useState(false);
  let roleData: string = "UNIVERSITY_ADMIN";

  useEffect(() => {
    getUserDetails();
    getUniversityDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await getAllUser();
      const responseData = response?.results ?? [];

      if (Array.isArray(responseData)) {
        const filterUser = responseData.filter(
          (item) => item?.role && item.role.toLowerCase() === "university_admin"
        );

        setUsers(filterUser);
      }
    } catch (error) {
      toast.error("Failed to fetch User");
    }
  };

  const getUniversityDetails = () => {
    getUniversitiesApi().then((data) => {
      setUniversities(data.results);
    });
  };

  const deleteDetails = () => {
    if (!getUniversities || !getUniversities.id) return;

    deleteUnversitiesApi(getUniversities.id)
      .then(() => {
        toast.success("University deleted successfully");
        getUniversityDetails();
      })
      .catch((err) => {
        console.error("Error deleting university:", err);
        toast.error("Failed to delete university");
      })
      .finally(() => {
        setShowModal(false); // Close the modal
      });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleUserForm = () => {
    setShowUserForm(!showUserForm);
    if (showUniversityForm) setShowUniversityForm(false);
  };

  const toggleUniversityForm = () => {
    setShowUniversityForm(!showUniversityForm);
    if (showUserForm) setShowUserForm(false);
  };

  const handleCancel = () => {
    setShowUserForm(false);
    setShowUniversityForm(false);
    getUniversityDetails();
  };

  const onHide = () => {
    setShowModal(false);
  };

  const userColumns = useMemo(
    () => [
    {
        accessorKey: 'index',
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

  const universityColumns = useMemo(
    () => [
      {
        id: "actions",
        header: "Actions",
        size: 100,
        Cell: ({ row }) => {
          const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
          const open = Boolean(anchorEl);

          const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
          };

          const handleClose = () => {
            setAnchorEl(null);
          };

          const handleUpdate = () => {
            handleClose();
            setGetUniversities(row.original);
            setShowUniversityForm(true);
          };

          const handleDelete = () => {
            handleClose();
            setShowModal(true);
            setGetUniversities(row.original);
          };

          return (
            <>
              <IconButton onClick={handleClick}>
                <MoreVerticalIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleUpdate}>Update</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </>
          );
        },
      },
      {
        accessorKey: "university_logo",
        header: "Logo",
        size: 100,
        Cell: ({ cell }) => {
          const logoUrl = cell.getValue();
          return logoUrl ? (
            <img
              src={logoUrl}
              alt="University Logo"
              style={{
                width: 40,
                height: 40,
                objectFit: "contain",
                borderRadius: "4px",
              }}
            />
          ) : (
            <Box
              sx={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "grey.200",
                color: "text.secondary",
                fontSize: 12,
                borderRadius: "4px",
              }}
            >
              N/A
            </Box>
          );
        },
      },
      {
        accessorKey: "university_name",
        header: "University Name",
        size: 200,
      },
      {
        accessorKey: "university_email",
        header: "Email",
        size: 200,
      },
      {
        accessorKey: "established_year",
        header: "Established Year",
        size: 150,
      },
      {
        accessorKey: "university_address",
        header: "Location",
        size: 200,
      },
      {
        accessorKey: "contact_number",
        header: "Students",
        size: 120,
      },
      {
        accessorKey: "is_active",
        header: "Status",
        size: 100,
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              backgroundColor: cell.getValue()
                ? theme.palette.success.light
                : theme.palette.error.light,
              color: cell.getValue()
                ? theme.palette.success.dark
                : theme.palette.error.dark,
              borderRadius: "0.25rem",
              p: "0.25rem 0.5rem",
              fontWeight: "bold",
            })}
          >
            {cell.getValue() ? "Active" : "Inactive"}
          </Box>
        ),
      },
    ],
    []
  );

  const userTable = useMaterialReactTable({
    columns: userColumns,
    data: users,
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

  const universityTable = useMaterialReactTable({
    columns: universityColumns,
    data: universities,
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

    muiTablePaperProps: {
      elevation: 6,
    },
    muiTableBodyRowProps: {
      sx: {
        height: "36px",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        py: "4px",
      },
    },
  });

  return (
    <Box sx={{ width: "100%", typography: "body1", p: 2 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} centered>
            <Tab label="User Management" value="1" />
            <Tab label="University Management" value="2" />
          </TabList>
        </Box>

        <TabPanel value="1" sx={{ p: 0, mt: 2 }}>
          <SectionHeader>
            <Typography variant="h5" fontWeight="bold">
              User Management
            </Typography>
            <Button
              variant="contained"
              startIcon={showUserForm ? <CloseIcon /> : <AddIcon />}
              onClick={toggleUserForm}
              color={showUserForm ? "secondary" : "primary"}
            >
              {showUserForm ? "Cancel" : "Add User"}
            </Button>
          </SectionHeader>

          <EmailRoleModal
            open={showUserForm}
            role={roleData}
            onClose={handleCancel}
          />

          <MaterialReactTable table={userTable} />
        </TabPanel>

        <TabPanel value="2" sx={{ p: 0, mt: 1 }}>
          <SectionHeader>
            <Typography variant="h5" fontWeight="bold">
              University Management
            </Typography>
            <Button
              variant="contained"
              startIcon={showUniversityForm ? <CloseIcon /> : <AddIcon />}
              onClick={toggleUniversityForm}
              color={showUniversityForm ? "secondary" : "primary"}
            >
              {showUniversityForm ? "Cancel" : "Add University"}
            </Button>
          </SectionHeader>

          <Collapse in={showUniversityForm}>
            <Box
              sx={{
                p: 1,
                mb: 1,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
              }}
            >
              <UniversityForm
                onCancel={handleCancel}
                universityData={getUniversities}
              />
            </Box>
          </Collapse>

          <MaterialReactTable table={universityTable} />
        </TabPanel>

        <Modal show={showModal} onHide={onHide} centered backdrop="static">
          <Modal.Body className="text-center p-4">
            <div className="mb-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"></div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Confirm Logout
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to logout from the system?
            </p>
            <div className="flex justify-center space-x-3">
              <Button
                variant="outline-secondary"
                onClick={onHide}
                className="px-4 py-2"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={deleteDetails}
                className="px-4 py-2"
              >
                Delete
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </TabContext>
    </Box>
  );
}

export default University;
