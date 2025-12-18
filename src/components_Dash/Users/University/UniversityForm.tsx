// components/UniversityForm.jsx
import React, { useEffect, useRef, useState } from 'react';
import {
  Paper,
  Grid,       
  TextField,
  Button,
  Typography,
  Box,      
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CloudUpload, Delete } from '@mui/icons-material';
import { universityApi, universityUpdateApi } from '../../../API/UserTypesApi';
import { toast } from 'react-toastify';

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(2),
  transition: 'all 0.3s ease',
}));

const UniversityForm = (props: any) => {
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState(null);
const [deleteId, setDeleteId] = useState(null);

  const fileInputRef = useRef(null);

  const [universityForm, setUniversityForm] = useState({
    name: '',
    email: '',
    address: '',
    established_year: '',
    website: '',
    contact_number: '',
    is_active: true,
    user: '',
    id: ''
  });

  useEffect(() => {
    if (props.universityData) {
      setUniversityForm({
        name: props.universityData.name || '',
        email: props.universityData.email || '',
        address: props.universityData.address || '',
        established_year: props.universityData.established_year || '',
        website: props.universityData.website || '',
        contact_number: props.universityData.contact_number || '',
        is_active: props.universityData.is_active ?? true,
        user: props.universityData.user || '',
        id: props.universityData.id || ''
      });

      if (props.universityData.logo) {
        setLogoPreview(props.universityData.logo);
      }
    }
  }, [props.universityData]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUniversityForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

 const handleUpdate = () => {
  const formData = new FormData();

  formData.append('name', universityForm.name);
  formData.append('email', universityForm.email);
  formData.append('address', universityForm.address);
  formData.append('established_year', universityForm.established_year);
  formData.append('website', universityForm.website);
  formData.append('contact_number', universityForm.contact_number);
formData.append(
  'is_active',
  universityForm.is_active ? 'true' : 'false'
);

  formData.append('user', universityForm.user);

  if (logoFile) {
    formData.append('logo', logoFile);
  }

  universityUpdateApi(universityForm.id, formData)
    .then(() => {
      toast.success("University Updated Successfully");

      setUniversityForm({
        name: '',
        email: '',
        address: '',
        established_year: '',
        website: '',
        contact_number: '',
        is_active: true,
        user: '',
        id: ''
      });

      setLogoFile(null);
      setLogoPreview('');
      props.onCancel?.();
    })
    .catch((error) => {
      toast.error("Error updating university");
      console.error(error);
    });
};


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', universityForm.name);
    formData.append('email', universityForm.email);
    formData.append('address', universityForm.address);
    formData.append('established_year', universityForm.established_year);
    formData.append('website', universityForm.website);
    formData.append('contact_number', universityForm.contact_number);
    formData.append('is_active', universityForm.is_active);
    formData.append('user', universityForm.user);

    if (logoFile) {
      formData.append('logo', logoFile);
    }


    universityApi(formData)
      .then(() => {
        toast.success("University Created Successfully");
        setUniversityForm({
          name: '',
          email: '',
          address: '',
          established_year: '',
          website: '',
          contact_number: '',
          id: ''
        });
        setLogoFile(null);
        setLogoPreview('');
        if (props.onCancel) props.onCancel();
      })
      .catch((error) => {
        toast.error("Error creating university");
        console.error(error);
      });
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setLogoFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormPaper elevation={10}>
      <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
        Add New University
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="University Name"
            name="name"
            value={universityForm.name}
            onChange={handleInputChange}
            required
            size="small"
          />

        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="University Email"
            name="email"
            value={universityForm.email}
            onChange={handleInputChange}
            required
            size="small"
          />

        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Established Year"
            name="established_year"
            type="number"
            value={universityForm.established_year}
            onChange={handleInputChange}
            required
            size="small"
          />

        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Contact Number"
            name="contact_number"
            value={universityForm.contact_number}
            onChange={handleInputChange}
            required
            size="small"
          />

        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'medium', mb: 1 }}>
            University Logo
          </Typography>

          {logoPreview ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box
                component="img"
                src={logoPreview}
                alt="Logo preview"
                sx={{
                  width: 100,
                  height: 100,
                  objectFit: 'contain',
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  p: 1,
                  backgroundColor: '#fafafa'
                }}
              />
              <IconButton
                color="error"
                onClick={handleRemoveLogo}
                size="small"
                sx={{ border: '1px solid #e0e0e0' }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          ) : (
            <Box
              sx={{
                border: '2px dashed #e0e0e0',
                borderRadius: 2,
                p: 2,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: '#fafafa',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'action.hover'
                }
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <CloudUpload sx={{ fontSize: 32, color: 'text.secondary', mb: 1 }} />
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Click to upload logo
              </Typography>
              <Typography variant="caption" color="text.secondary">
                PNG, JPG up to 5MB
              </Typography>
            </Box>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleLogoUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="University Address"
            name="address"
            value={universityForm.address}
            onChange={handleInputChange}
            multiline
            rows={3}
            required
          />

        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Website"
            name="website"
            value={universityForm.website}
            onChange={handleInputChange}
            size="small"
          />

        </Grid>

        <Grid item xs={12}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            pt: 0,
          }}>
            {(props.universityData && props.universityData.id) ? (
              <Button
                type="submit"
                variant="contained"
                size="medium"
                sx={{ minWidth: 150 }}
                onClick={handleUpdate}
              >
                Update University
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                size="medium"
                sx={{ minWidth: 150 }}
                onClick={handleSubmit}
              >
                Create University
              </Button>	
            )}
            <Button
              type="button"
              variant="outlined"
              size="medium"
              onClick={props.onCancel}
              sx={{ minWidth: 100 }}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </FormPaper>
  );
};

export default UniversityForm;