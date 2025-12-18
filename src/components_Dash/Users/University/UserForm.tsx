// components/UserForm.jsx
import React, { useState } from 'react';
import {
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { signUp } from '../../../API/UserApi';
import { toast } from 'react-toastify';

const FormPaper = styled(Paper)(({ theme }) => ({   
  padding: theme.spacing(3),
  marginTop: theme.spacing(2),
  transition: 'all 0.3s ease',
}));

const UserForm = ({ onCancel, onSubmitSuccess }) => {
  const [userForm, setUserForm] = useState({
    userName: '',
    email: '',
    password: '',
    number: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = {
          email:userForm.email,
          role : "UNIVERSITY_ADMIN",
    }
    const responseData = signUp(userForm);
    responseData.then((data) => {
      toast.success("User Created Successfully");
      setUserForm({
        userName: '',
        email: '',
        password: '',
        number: ''
      });
    }).catch(error => {
      toast.error("Error creating user");
    });
  };

  return (
    <FormPaper elevation={3}>
      <Typography variant="h6" gutterBottom color="primary">
        Add New User
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="User Name"
            name="userName"
            value={userForm.userName}
            onChange={handleInputChange}
            required
            variant="outlined"
            size='small'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={userForm.email}
            onChange={handleInputChange}
            required
            variant="outlined"
            size='small'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={userForm.password}
            onChange={handleInputChange}
            required
            variant="outlined"
            size='small'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone Number"
            name="number"
            type="tel"
            value={userForm.number}
            onChange={handleInputChange}
            required
            variant="outlined"
            size='small'
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
          <Button type="submit" variant="contained" size="small" onClick={handleSubmit}>
            Create User
          </Button>
          <Button
            type="button"
            variant="outlined"
            size="small"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </FormPaper>
  );
};

export default UserForm;