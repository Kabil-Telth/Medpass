import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Grid, Card, CardContent, CardHeader, CardActions,
  Divider, Button, TextField, FormControl, InputLabel, Select, MenuItem,
  Avatar, Typography, Stack, Modal, Box, IconButton, InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff, CameraAlt, ArrowBack, Edit, Save, Lock } from '@mui/icons-material';
import { getProfileUser, getUser, profileUpdate, resetPassword } from '../../API/UserApi';
import { getUserDetails } from '../../Constant';
import { toast } from 'react-toastify';

const states = [
  { value: 'alabama', label: 'Alabama' },
];

function AccountInfo({ user, editing, onAvatarChange }) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Avatar
              src={user.profile_picture || user.avatar}
              sx={{ height: '100px', width: '100px' }}
            />
            {editing && (
              <label htmlFor="avatar-upload">
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={onAvatarChange}
                  style={{ display: 'none' }}
                />
                <IconButton
                  component="span"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'primary.main',
                    '&:hover': { backgroundColor: 'primary.dark' }
                  }}
                >
                  <CameraAlt sx={{ color: 'white' }} />
                </IconButton>
              </label>
            )}
          </div>
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">{user.name}</Typography>
            <Typography color="text.secondary" variant="body2">
              {user.city} {user.country}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user.timezone}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text" component="label" htmlFor="avatar-upload">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
}

function AccountDetailsForm({ user, editing, onChange, onSave, onCancel }) {
  return (
    <Card>
      <CardHeader
        subheader="The information can be edited"
        title="Profile Details"
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="First name"
              name="firstName"
              value={user.firstName || ''}
              onChange={onChange}
              disabled={!editing}
              required
              size='small'
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Last name"
              name="lastName"
              value={user.lastName || ''}
              onChange={onChange}
              disabled={!editing}
              required
              size='small'
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Email address"
              name="email"
              value={user.email || ''}
              onChange={onChange}
              disabled={!editing}
              required
              size='small'
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Phone number"
              name="phone"
              type="tel"
              value={user.phone || ''}
              onChange={onChange}
              disabled={!editing}
              size='small'
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth disabled={!editing} sx={{ minWidth: 120 }}>
              <InputLabel>State</InputLabel>
              <Select
                value={user.state || ''}
                label="State"
                name="state"
                size='small'
                onChange={onChange}
                sx={{
                  minWidth: 200,
                  '& .MuiSelect-select': {
                    padding: '12px 14px'
                  }
                }}
              >
                {states.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={user.city || ''}
              onChange={onChange}
              size='small'
              disabled={!editing}
            />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      {editing && (
        <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
          <Button variant="outlined" onClick={onCancel} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onSave}>
            Save details
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

function PasswordModal({ open, onClose, onSubmit, passwordData, onChange, loading, showPassword, toggleShowPassword }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 1
      }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <Lock sx={{ mr: 1 }} /> Change Password
        </Typography>

        <TextField
          fullWidth
          label="Current Password"
          type={showPassword.current ? 'text' : 'password'}
          name="currentPassword"
          value={passwordData.currentPassword}
          onChange={onChange}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => toggleShowPassword('current')}
                  edge="end"
                >
                  {showPassword.current ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="New Password"
          type={showPassword.new ? 'text' : 'password'}
          name="newPassword"
          value={passwordData.newPassword}
          onChange={onChange}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => toggleShowPassword('new')}
                  edge="end"
                >
                  {showPassword.new ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Confirm New Password"
          type={showPassword.confirm ? 'text' : 'password'}
          name="confirmPassword"
          value={passwordData.confirmPassword}
          onChange={onChange}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => toggleShowPassword('confirm')}
                  edge="end"
                >
                  {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? 'Changing...' : 'Change Password'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

const ProfileDetails = () => {
  const [user, setUser] = useState({
    profile_picture: '',
    name: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatar: '',
    city: '',
    country: '',
    state: '',
    timezone: 'GTM-7',
    joined: ''
  });

  const [editing, setEditing] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userDetails = getUserDetails();
  let userId = localStorage.getItem('userId')

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = async () => {
    try {
      const responseData = await getProfileUser(userId);
      if (responseData) {
        setUser({
          ...user,
          profile_picture: responseData.profile_picture || '',
          name: responseData.username || '',
          firstName: responseData.firstName || responseData.name?.split(' ')[0] || '',
          lastName: responseData.lastName || responseData.name?.split(' ')[1] || '',
          email: responseData.email || '',
          phone: responseData.phone || '',
          avatar: responseData.avatar || '',
          city: responseData.city || 'Not specified',
          country: responseData.country || '',
          state: responseData.state || '',
          joined: new Date(responseData.date_joined).toLocaleDateString() || 'Unknown'
        });
      } else {
        toast.error('Failed to load user details');
      }
    } catch (error) {
      toast.error('Failed to load user details');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const userDetails = {
        // date_joined: user.joined,
        // email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        profile_picture: user.profile_picture,
        // username: user.name,
      };
      const responseData = await profileUpdate(user.name, userDetails);
      toast.success('Profile updated successfully');
      setEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    }
  };


  const handlePasswordSubmit = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long');
      return;
    }
    setLoading(true);

    try {
      const passwordDetails = {
        old_password: passwordData.currentPassword,
        new_password: passwordData.newPassword
      };

      const responseData = await resetPassword(userDetails.userName.email, passwordDetails);

      if (responseData) {
        toast.success(responseData?.message);
        setPasswordModalOpen(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        toast.error(responseData?.message || 'Failed to change password');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred while changing password');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      toast.error('Only JPG/PNG images are allowed');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUser(prev => ({ ...prev, profile_picture: event.target?.result }));
      toast.success('Avatar updated successfully');
    };
    reader.readAsDataURL(file);
  };

  const toggleShowPassword = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <Container sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>
      <Grid container spacing={3} alignItems="flex-start">
        {/* Left Column - Photo and Security */}
        <Grid item xs={12} md="auto">
          <Box sx={{ width: 300 }}>
            <Stack spacing={3}>
              <AccountInfo
                user={user}
                editing={editing}
                onAvatarChange={handleAvatarUpload}
              />
              <Card>
                <CardHeader title="Security" />
                <CardContent>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Last changed 2 months ago
                  </Typography>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Lock />}
                    onClick={() => setPasswordModalOpen(true)}
                  >
                    Change Password
                  </Button>
                </CardContent>
              </Card>
            </Stack>
          </Box>
        </Grid>
        {/* Right Column - Profile Details */}
        <Grid item xs={12} md sx={{ width: 730 }}>
          <AccountDetailsForm
            user={user}
            editing={editing}
            onChange={handleInputChange}
            onSave={handleSave}
            onCancel={() => setEditing(false)}
          />
          {!editing && (
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={() => setEditing(true)}
              sx={{ mt: 3 }}
            >
              Edit Profile
            </Button>
          )}
        </Grid>
      </Grid>
      <PasswordModal
        open={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onSubmit={handlePasswordSubmit}
        passwordData={passwordData}
        onChange={handlePasswordChange}
        loading={loading}
        showPassword={showPassword}
        toggleShowPassword={toggleShowPassword}
      />
    </Container>
  );
};

export default ProfileDetails;
