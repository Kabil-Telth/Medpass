import React, { useState } from "react";
import "../Login.css";
import { loginApi, otpVerfiyAPi } from "../API/UserApi";
import { setRememberMe, setToken, setUserDetails } from "../Constant";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Import Material-UI components
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  CircularProgress,
  InputAdornment,
  IconButton
} from "@mui/material";

export default function AuthForm() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetail] = useState({
    userName: "",
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({
    userName: false,
    password: false,
    otp: false
  });
  const [touched, setTouched] = useState({
    userName: false,
    password: false,
    otp: false
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setUserDetail((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));

    if (field === 'userName' && !userDetails.userName.trim()) {
      setErrors(prev => ({ ...prev, userName: true }));
    }
    if (field === 'password' && !userDetails.password.trim()) {
      setErrors(prev => ({ ...prev, password: true }));
    }
  };

  const handlePasswordToggle = () => setPasswordVisible(!passwordVisible);

  const validateForm = () => {
    const newErrors = {
      userName: !userDetails.userName.trim(),
      password: !userDetails.password.trim(),
    };

    setErrors(prev => ({ ...prev, ...newErrors }));

    setTouched((prev) => ({
      ...prev,
      userName: true,
      password: true,
    }));

    return !newErrors.userName && !newErrors.password;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);
      const otpResponse = await otpVerfiyAPi({
        email: userDetails.userName,
        password: userDetails.password,
      });

      setShowOtpModal(true); // open OTP modal
      toast.success("OTP sent successfully! Please check your phone/email.");

    } catch (error) {
      const errorMessage = error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.message ||
        "Invalid credentials";
      toast.error(`Login failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    if (!otp || otp.length !== 6) {
      setErrors((prev) => ({ ...prev, otp: true }));
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setIsLoading(true);
      const responseData = await loginApi({
        email: userDetails.userName,
        password: userDetails.password,
        otp: otp,
      });
      setUserDetails(userDetails);
      setToken({
        access: responseData.access,
        refresh: responseData.refresh,
        role: responseData.role
      });
      setOtp("");
      toast.success("Login successful!");
      setRememberMe(userDetails.rememberMe);
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.message ||
        "OTP verification failed";
      toast.error(`OTP verification failed: ${errorMessage}`);
      setOtp("");
      setErrors((prev) => ({ ...prev, otp: true }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 6) {
      setOtp(value);
      if (errors.otp) setErrors(prev => ({ ...prev, otp: false }));
    }
  };

  const closeOtpModal = () => {
    setShowOtpModal(false);
    setOtp("");
    setErrors(prev => ({ ...prev, otp: false }));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side (Form) */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <Box
          sx={{
            width: '100%',
            maxWidth: 400,
            borderRadius: 4,
            boxShadow: '5px 5px 10px 2px rgba(7, 66, 143, 0.58)',
          }}
          className="p-8 w-full"
        >
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

            {/* Username */}
            <TextField
              fullWidth
              name="userName"
              label="Username"
              placeholder="Enter your username"
              value={userDetails.userName}
              onChange={handleChange}
              onBlur={() => handleBlur('userName')}
              required
              error={errors.userName && touched.userName}
              helperText={errors.userName && touched.userName ? "Username is required" : ""}
              sx={{ mb: 2 }}
              variant="outlined"
            />

            {/* Password */}
            <TextField
              fullWidth
              name="password"
              label="Password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={userDetails.password}
              onChange={handleChange}
              onBlur={() => handleBlur('password')}
              required
              error={errors.password && touched.password}
              helperText={errors.password && touched.password ? "Password is required" : ""}
              sx={{ mb: 1 }}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handlePasswordToggle}
                      size="small"
                    >
                      {passwordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Remember + Forgot */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={userDetails.rememberMe}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Link to="/forgetemail" className="text-blue-600 hover:underline text-sm">
                Forgot password?
              </Link>
            </Box>

            {/* Sign In Button */}
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={isLoading}
              size="large"
              sx={{
                py: 1.5,
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
                '&:disabled': {
                  backgroundColor: '#90caf9',
                }
              }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
            </Button>
          </form>
        </Box>
      </div>

      {/* Right Side (Overlay with Spinner + Text) */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="spinner mb-6 ">
          <div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div>
          <div></div><div></div>
        </div>
        <h1 className="text-3xl font-bold mb-3">Hello,Future Doctors!</h1>
        <p className="text-lg">Enter your details and start your journey</p>
      </div>

      {/* OTP Modal */}
      <Dialog
        open={showOtpModal}
        onClose={closeOtpModal}
        maxWidth="sm"
        fullWidth
        disableEscapeKeyDown={isLoading}
      >
        <DialogTitle>Enter OTP</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="OTP"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={handleOtpChange}
            onBlur={() => setTouched(prev => ({ ...prev, otp: true }))}
            sx={{ mt: 2 }}
            inputProps={{
              maxLength: 6,
              inputMode: 'numeric',
              pattern: '[0-9]*'
            }}
            variant="outlined"
            required
            error={errors.otp}
            helperText={errors.otp ? "OTP must be exactly 6 digits" : ""}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeOtpModal} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleOtpSubmit}
            disabled={isLoading || otp.length !== 6}
            variant="contained"
          >
            {isLoading ? <CircularProgress size={20} color="inherit" /> : "Verify"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



