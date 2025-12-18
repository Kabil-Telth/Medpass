import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Chip,
  Box,
  Typography,
  Paper,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress
} from "@mui/material";
import { Close, Email, Send } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { sendInvite } from "../../API/UserApi";
import { toast } from "react-toastify";
import { handleApiError } from "../../utils/ApiHepler";

interface EmailRoleModalProps {
  open: boolean;
  onClose: () => void;
  role?: string;
}

interface RoleOption {
  value: string;
  label: string;
}

const useStyles = makeStyles(() => ({
  dialog: {
    "& .MuiDialog-paper": {
      borderRadius: 12,
      padding: 8, 
      minWidth: 400
    }
  },
  previewBox: {
    backgroundColor: '#fafafa', 
    borderRadius: 8,
    padding: 8,
    marginTop: 8
  },
  emailChip: {
    margin: 4, 
    backgroundColor: '#42a5f5', 
    color: '#fff'
  },
  roleChip: {
    margin: 4,
    backgroundColor: '#ba68c8', 
    color: '#fff' 
  }
}));

const EmailRoleModal: React.FC<EmailRoleModalProps> = ({ open, onClose, role }) => {
  const classes = useStyles();
  const [emails, setEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>(role || "");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const roleOptions: RoleOption[] = [
    { value: "TELTH_ADMIN", label: "Telth-Admin" },
    { value: "STUDENT", label: "Student" },
    { value: "AGENT", label: "Professor" },
    { value: "UNIVERSITY_ADMIN", label: "University Admin" }
  ];
  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddEmail = () => {
    if (!currentEmail.trim()) return;

    if (!validateEmail(currentEmail)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (emails.includes(currentEmail)) {
      setEmailError("Email already added");
      return;
    }

    setEmails([...emails, currentEmail]);
    setCurrentEmail("");
    setEmailError("");
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails(emails.filter(email => email !== emailToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddEmail();
    }
  };

  const handleSave = async () => {
    // Use the role prop if provided, otherwise use selectedRole
    const roleToUse = role || selectedRole;
    
    if (!emails.length || !roleToUse) {
      toast.error("Please enter at least one email and select a role.");
      console.log("Validation failed: emails=", emails.length, "role=", roleToUse);
      return;
    }

    setIsLoading(true);
    try {
      const payload = emails.map(email => ({
        email: email,
        role: roleToUse
      }));

      await sendInvite(payload);
      toast.success("Invites sent successfully!");

      // Reset form
      setEmails([]);
      setSelectedRole(role || "");
      onClose();
    } catch (error: any) {
      
    handleApiError(error)
    } finally {
      setIsLoading(false);
    }
  };

  // Determine which role to display/use
  const currentRole = role || selectedRole;
  const showRoleSelection = !role; // Only show role selection if no role prop is provided

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className={classes.dialog}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ height: 48, padding: '8px 16px' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" component="div">
            <Email sx={{ mr: 1, verticalAlign: 'middle' }} className="text-primary" />
            <span className="text-primary">Invite Users</span>
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box mt={3} mb={2}>
          <TextField
            fullWidth
            label="Enter Email"
            variant="outlined"
            value={currentEmail}
            onChange={(e) => {
              setCurrentEmail(e.target.value);
              setEmailError("");
            }}
            onKeyPress={handleKeyPress}
            error={!!emailError}
            helperText={emailError}
            size="small"
            placeholder="Type email and press Enter to add"
            InputProps={{
              endAdornment: (
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleAddEmail}
                  disabled={!currentEmail.trim()}
                >
                  Add
                </Button>
              )
            }}
          />
        </Box>

        {/* Selected Emails */}
        {emails.length > 0 && (
          <Box mb={3}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Selected Emails:
            </Typography>
            <Paper variant="outlined" sx={{ p: 1, minHeight: 48 }}>
              {emails.map((email, index) => (
                <Chip
                  key={index}
                  label={email}
                  onDelete={() => handleRemoveEmail(email)}
                  className={classes.emailChip}
                  size="small"
                />
              ))}
            </Paper>
          </Box>
        )}

        {/* Role Selection - Only show if no role prop is provided */}
        {showRoleSelection && (
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }} >
            <InputLabel>Select Role</InputLabel>
            <Select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              label="Select Role"
            >
              {roleOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Show selected role if provided as prop */}
        {role && (
          <Box mb={2}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Role:
            </Typography>
            <Chip
              label={roleOptions.find(r => r.value === role)?.label || role}
              className={classes.roleChip}
            />
          </Box>
        )}

        {/* Preview */}
        {emails.length > 0 && currentRole && (
          <Box className={classes.previewBox} mt={2}>
            <Typography variant="subtitle2" gutterBottom>
              Preview:
            </Typography>
            {emails.map((email, index) => (
              <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body2">{email}</Typography>
                <Chip
                  label={roleOptions.find(r => r.value === currentRole)?.label || currentRole}
                  size="small"
                  className={classes.roleChip}
                />
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={!emails.length || !currentRole || isLoading}
          variant="contained"
          startIcon={isLoading ? <CircularProgress size={16} /> : <Send />}
        >
          {isLoading ? "Sending..." : "Send Invites"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmailRoleModal;