// UserPop.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import Logout from "./Logout";
import { clearAllLocalStorage, getUserDetails } from "../../Constant";

const paths = {
  dashboard: {
    settings: "/dashboard/setting",
    profile: "/dashboard/profile",
  },
};

export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

export function UserPopover({
  anchorEl,
  onClose,
  open,
}: UserPopoverProps): React.JSX.Element {
  const [showLogout, setShowLogout] = React.useState(false);
  const navigate = useNavigate();
  let userDetails = getUserDetails();

  const handleLogoutConfirm = () => {
    setShowLogout(true);
    onClose();
  };

  const handleCloseLogout = () => {
    setShowLogout(false);
  };

  const handleLogout = () => {
    setShowLogout(false);
    clearAllLocalStorage();
    navigate("/login");
  };

  return (
    <>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        onClose={onClose}
        open={open}
        slotProps={{ paper: { sx: { width: "240px" } } }}
      >
        <Box sx={{ p: "16px 20px" }}>
          <Typography variant="subtitle1" className="text-rose-600">{userDetails?.userName?.email}</Typography>
        </Box>
        <Divider />
        <MenuList
          disablePadding
          sx={{ p: "8px", "& .MuiMenuItem-root": { borderRadius: 1 } }}
        >
          <MenuItem
            component={RouterLink}
            to={paths.dashboard.settings}
            onClick={onClose}
          >
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem
            component={RouterLink}
            to={paths.dashboard.profile}
            onClick={onClose}
          >
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogoutConfirm}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Log out
          </MenuItem>
        </MenuList>
      </Popover>

      {/* Render Logout modal outside the Popover */}
      <Logout
        showModal={showLogout}
        onHide={handleCloseLogout}
        onLogoutConfirm={handleLogout}
      />
    </>
  );
}

export default UserPopover;
