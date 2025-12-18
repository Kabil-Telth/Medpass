import React, { useState, useMemo, useEffect } from "react";
import moment from "moment";
import { MoreVerticalIcon } from "lucide-react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import UniversityForm from "./UniversityForm";
import {
  deleteUnversitiesApi,
  getUniversitiesApi,
} from "../../../API/UserTypesApi";
import EmailRoleModal from "../EmailRoleModal";
import { getAllUser } from "../../../API/UserApi";
import CommonMRT from "../../../components/MaterialReactTable";
import { SectionHeader } from "../../../CommonStyle";

function University() {
  const [value, setValue] = useState("1");
  const [showUserForm, setShowUserForm] = useState(false);
  const [showUniversityForm, setShowUniversityForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [universityFormMode, setUniversityFormMode] = useState("create"); // "create", "edit", or "delete"
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

  const handleDeleteConfirm = () => {
    if (!selectedUniversity || !selectedUniversity.id) {
      toast.error("No university selected for deletion");
      return;
    }

    deleteUnversitiesApi(selectedUniversity.id)
      .then(() => {
        toast.success("University deleted successfully");
        getUniversityDetails();
        setSelectedUniversity(null);
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
    if (showUniversityForm) {
      setShowUniversityForm(false);
      setUniversityFormMode("create");
    }
  };

  const toggleUniversityForm = () => {
    if (!showUniversityForm) {
      setUniversityFormMode("create");
      setSelectedUniversity(null);
    }
    setShowUniversityForm(!showUniversityForm);
    if (showUserForm) setShowUserForm(false);
  };

  const handleCancel = () => {
    setShowUserForm(false);
    setShowUniversityForm(false);
    setSelectedUniversity(null);
    setUniversityFormMode("create");
    getUniversityDetails();
  };

  const handleUniversityFormSuccess = () => {
    getUniversityDetails();
    setShowUniversityForm(false);
    setSelectedUniversity(null);
    setUniversityFormMode("create");
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
          const [anchorEl, setAnchorEl] = useState(null);
          const open = Boolean(anchorEl);
          
          const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
          };
          
          const handleClose = () => {
            setAnchorEl(null);
          };
          
          const handleUpdate = () => {
            handleClose();
            setSelectedUniversity(row.original);      
            setUniversityFormMode("edit");
            setShowUniversityForm(true);
          };
          
          const handleDelete = () => {
            handleClose();
            setSelectedUniversity(row.original);
            setShowDeleteModal(true);
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
        }
      },
      {
        accessorKey: "logo",
        header: "Logo",
        size: 100,
        Cell: ({ cell }) => {
          const logoUrl = cell.getValue();
          return logoUrl ? (
            <img
              src={logoUrl}
              alt="University Logo"
              style={{ width: 40, height: 40, objectFit: "contain" }}
            />
          ) : (
            <Box sx={{ width: 40, height: 40, bgcolor: "grey.200" }}>N/A</Box>
          );
        },
      },
      {
        accessorKey: "name",
        header: "University Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "established_year",
        header: "Established Year",
      },
      {
        accessorKey: "address",
        header: "Location",
      },
      {
        accessorKey: "contact_number",
        header: "Contact",
      },
      {
        accessorKey: "is_active",
        header: "Status",
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
              borderRadius: "4px",
              px: 1,
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

          <CommonMRT columns={userColumns} data={users} />
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
                mode={universityFormMode}
                universityData={selectedUniversity}
                onCancel={handleCancel}
                onSuccess={handleUniversityFormSuccess}
              />
            </Box>
          </Collapse>

          <CommonMRT columns={universityColumns} data={universities} />
        </TabPanel>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered backdrop="static">
          <Modal.Body className="text-center p-4">
            <div className="mb-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.795-.833-2.565 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Delete University
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete "<strong>{selectedUniversity?.name}</strong>"?
              This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-3">
              <Button
                variant="outlined"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteConfirm}
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