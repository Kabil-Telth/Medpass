import React, { useEffect, useState } from 'react';
import {
    Stepper, Step, StepLabel,
    TextField, Button, Grid, Paper, Typography, Box, MenuItem, Select, InputLabel, FormControl,
    Card, CardContent, Avatar, Fade, Slide, InputAdornment, IconButton
} from '@mui/material';
import {
    AddPhotoAlternate, School, Description, CheckCircle,
    AttachMoney, Schedule, LocationOn, Star, Work, CreditCard,
    Festival
} from '@mui/icons-material';
import { createCourseApi, createCourseDetailsApi } from '../../API/CourseApi';
import { toast } from 'react-toastify';
import { getUniversitiesApi } from '../../API/UserTypesApi';

interface University {
    value: number;
    label: string;
}

interface ProgramData {
    name: string;
    code: string;
    duration: string;
    fees: string;
    location: string;
    university: number;
}

interface CourseData {
    summary: string;
    qualifications: string;
    poster: File | null;
    rating: string;
    department: string;
    credit_hours: string;
    application_status: string;
    course: number;
}

const steps = ['Program Details', 'Course Details'];

const CourseCreationWizard: React.FC = () => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [programId, setProgramId] = useState<number | null>(null);
    const [universities, setUniversities] = useState<University[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [programData, setProgramData] = useState<ProgramData>({
        name: '',
        code: '',
        duration: '',
        fees: '',
        location: '',
        university: 0, // Changed from 5 to 0 for "Select University"
    });

    const [courseData, setCourseData] = useState<CourseData>({
        summary: '',
        qualifications: '',
        poster: null,
        rating: '',
        department: '',
        credit_hours: '',
        application_status: '',
        course: 0
    })

    useEffect(() => {
        getUniversityDetail()
    }, [])

    const handleProgramChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProgramData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUniversitySelectChange = (e: any) => {
        const value = e.target.value;
        setProgramData(prev => ({
            ...prev,
            university: value
        }));
    };

    const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCourseData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCourseData(prev => ({
                ...prev,
                poster: e.target.files![0]
            }));
        }
    };

    const handleApplicationStatusChange = (e: any) => {
        const value = e.target.value;
        setCourseData(prev => ({
            ...prev,
            application_status: value
        }));
    };

    const getUniversityDetail = async () => {
        try {
            setIsLoading(true);
            const data = await getUniversitiesApi();
            const resultData = data.results || [];
            
            console.log("Universities API response:", resultData); // Debug log
            
            const universityOptions: University[] = resultData.map((element: any) => ({
                value: element.id,
                label: element.name // Changed from university_name to name
            }));
            
            console.log("University options:", universityOptions); // Debug log
            setUniversities(universityOptions);
        } catch (error) {
            console.error("Error fetching universities:", error);
            toast.error("Failed to load universities");
        } finally {
            setIsLoading(false);
        }
    };

    const handleNext = async () => {
        const { name, code, duration, fees, location, university } = programData;

        if (!name || !code || !duration || !fees || !location || !university) {
            toast.error("Please fill all required fields for the program");
            return;
        }
        
        if (university === 0) {
            toast.error("Please select a university");
            return;
        }
        
        setActiveStep(prev => prev + 1);
    };

    const handleBack = () => {
        setActiveStep(prev => prev - 1);
    };

  const handleSubmitCourse = async () => {
    const { name, code, duration, fees, location, university } = programData;

    if (!programData.university || programData.university === 0) {
        toast.error("Please select a university");
        return;
    }

    try {
        // Validate program data
        if (!name || !code || !duration || !fees || !location) {
            toast.error("Please fill all program details");
            return;
        }

        const programDetail = {
            name,
            code,
            duration,
            fees,
            location,
            university: programData.university,
        };

        console.log("Creating program:", programDetail);

        const programRes = await createCourseApi(programDetail);
        
        if (!programRes?.id) {
            toast.error("Failed to create program");
            return;
        }

        const newProgramId = programRes.id;
        setProgramId(newProgramId);
        
        // Validate course data
        const { summary, qualifications, poster, department, credit_hours, application_status } = courseData;

        if (!summary || !qualifications || !department || !credit_hours || !application_status) {
            toast.error("Please fill all required fields for the course");
            return;
        }

        // Create FormData with FLAT structure (not nested)
        const formData = new FormData();
        
        // Add each field individually to FormData
        formData.append('summary', summary);
        formData.append('qualifications', qualifications);
        formData.append('department', department);
        formData.append('credit_hours', credit_hours);
        formData.append('application_status', application_status);
        formData.append('course', newProgramId.toString()); // Convert to string
        
        // Add poster if exists
        if (poster && poster instanceof File) {
            formData.append('poster', poster);
        }

        // Debug: Log FormData contents
        console.log("FormData contents:");
        for (let [key, val] of formData.entries()) {
            console.log(`${key}:`, val, typeof val);
        }

        const res = await createCourseDetailsApi(formData);
        if (res) {
            toast.success("Course details added successfully!");
            setActiveStep(steps.length);

            // Reset form
            setProgramData({
                name: "",
                code: "",
                duration: "",
                fees: "",
                location: "",
                university: 0,
            });
            setCourseData({
                summary: "",
                qualifications: "",
                poster: null,
                rating: "",
                department: "",
                credit_hours: "",
                application_status: "",
                course: 0,
            });
            setProgramId(null);
        } else {
            throw new Error("Failed to create course details");
        }
    } catch (err) {
        console.error("Error creating course:", err);
        toast.error("Failed to create program or course details");
    }
};
    return (
        <Fade in={true}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '70vh',
            }}>
                <Card sx={{
                    width: '100%',
                    maxWidth: 950,
                    borderRadius: 3,
                    boxShadow: '0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07)',
                    overflow: 'visible'
                }}>
                    <Box sx={{
                        background: 'linear-gradient(45deg, #4776E6 0%, #8E54E9 100%)',
                        color: 'white',
                        p: 3,
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12
                    }}>
                        <Typography variant="body1" sx={{ opacity: 0.9 }}>
                            <School sx={{ fontSize: 32, mr: 1.5 }} />
                            Follow the steps to create a new program and course
                        </Typography>
                    </Box>

                    <CardContent sx={{ p: 4 }}>
                        {/* Progress Bar */}
                        <Stepper activeStep={activeStep} sx={{ mb: 5, px: 2 }}>
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel
                                        StepIconProps={{
                                            sx: {
                                                color: activeStep === index ? '#4776E6' : '#ccc',
                                                '& .MuiStepIcon-text': { fontWeight: 'bold' }
                                            }
                                        }}
                                    >
                                        <Typography variant="body2" fontWeight="500">
                                            {label}
                                        </Typography>
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        {/* Step 1 - Program Details */}
                        <Slide direction="right" in={activeStep === 0} mountOnEnter unmountOnExit>
                            <Box>
                                <Grid container spacing={3}>
                                    {/* University Dropdown - Full width on mobile, half on larger screens */}
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="university-label">University *</InputLabel>
                                            <Select
                                                labelId="university-label"
                                                label="University *"
                                                name="university"
                                                value={programData.university}
                                                onChange={handleUniversitySelectChange}
                                                disabled={isLoading}
                                            >
                                                <MenuItem value={0}>
                                                    <em>Select University</em>
                                                </MenuItem>
                                                {isLoading ? (
                                                    <MenuItem disabled>Loading universities...</MenuItem>
                                                ) : (
                                                    universities.map((uni) => (
                                                        <MenuItem key={uni.value} value={uni.value}>
                                                            {uni.label}
                                                        </MenuItem>
                                                    ))
                                                )}
                                            </Select>
                                            {universities.length === 0 && !isLoading && (
                                                <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                                                    No universities available. Please add universities first.
                                                </Typography>
                                            )}
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Program Name *"
                                            name="name"
                                            value={programData.name}
                                            onChange={handleProgramChange}
                                            variant="outlined"
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <School color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Program Code *"
                                            name="code"
                                            value={programData.code}
                                            onChange={handleProgramChange}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Duration (months) *"
                                            name="duration"
                                            type="number"
                                            value={programData.duration}
                                            onChange={handleProgramChange}
                                            variant="outlined"
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Schedule color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Fees ($) *"
                                            name="fees"
                                            type="number"
                                            value={programData.fees}
                                            onChange={handleProgramChange}
                                            variant="outlined"
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AttachMoney color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Location *"
                                            name="location"
                                            value={programData.location}
                                            onChange={handleProgramChange}
                                            variant="outlined"
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LocationOn color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Slide>

                        {/* Step 2 - Course Details */}
                        <Slide direction="left" in={activeStep === 1} mountOnEnter unmountOnExit>
                            <Box>
                                <Typography variant="h6" gutterBottom sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 3,
                                    color: '#4776E6'
                                }}>
                                    <Description sx={{ mr: 1 }} /> Course Information
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Course Summary *"
                                            name="summary"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            value={courseData.summary}
                                            onChange={handleCourseChange}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Required Qualifications *"
                                            name="qualifications"
                                            fullWidth
                                            multiline
                                            rows={3}
                                            value={courseData.qualifications}
                                            onChange={handleCourseChange}
                                            variant="outlined"
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Work color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Department *"
                                            name="department"
                                            fullWidth
                                            value={courseData.department}
                                            onChange={handleCourseChange}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Credit Hours *"
                                            name="credit_hours"
                                            type="number"
                                            fullWidth
                                            value={courseData.credit_hours}
                                            onChange={handleCourseChange}
                                            variant="outlined"
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CreditCard color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Status *</InputLabel>
                                            <Select
                                                name="application_status"
                                                value={courseData.application_status}
                                                onChange={handleApplicationStatusChange}
                                                label="Status *"
                                                required
                                            >
                                                <MenuItem value="OPEN">OPEN</MenuItem>
                                                <MenuItem value="CLOSED">CLOSED</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box sx={{
                                            border: '2px dashed #ccc',
                                            borderRadius: 2,
                                            p: 3,
                                            textAlign: 'center',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                borderColor: '#4776E6',
                                                backgroundColor: 'rgba(71, 118, 230, 0.03)'
                                            }
                                        }}>
                                            <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="poster-upload"
                                                type="file"
                                                name="poster"
                                                onChange={handleFileChange}
                                            />
                                            <label htmlFor="poster-upload">
                                                <Button
                                                    variant="outlined"
                                                    component="span"
                                                    startIcon={<AddPhotoAlternate />}
                                                    sx={{ mb: 1 }}
                                                >
                                                    Upload Course Poster (Optional)
                                                </Button>
                                            </label>
                                            {courseData.poster && (
                                                <Box mt={1}>
                                                    <Typography variant="body2" color="success.main">
                                                        Selected: {courseData.poster.name}
                                                    </Typography>
                                                </Box>
                                            )}
                                            <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                                                JPEG, PNG or GIF (Max 5MB)
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Slide>

                        {/* Buttons */}
                        <Box mt={6} display="flex" justifyContent="space-between">
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                variant="outlined"
                                sx={{ borderRadius: 2, px: 3 }}
                            >
                                Back
                            </Button>
                            {activeStep === steps.length - 1 ? (
                                <Button
                                    variant="contained"
                                    onClick={handleSubmitCourse}
                                    sx={{
                                        borderRadius: 2,
                                        px: 4,
                                        background: 'linear-gradient(45deg, #4776E6 0%, #8E54E9 100%)',
                                        boxShadow: '0 4px 10px rgba(71, 118, 230, 0.3)'
                                    }}
                                    endIcon={<CheckCircle />}
                                >
                                    Create Course
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{
                                        borderRadius: 2,
                                        px: 4,
                                        background: 'linear-gradient(45deg, #4776E6 0%, #8E54E9 100%)',
                                        boxShadow: '0 4px 10px rgba(71, 118, 230, 0.3)'
                                    }}
                                >
                                    Next
                                </Button>
                            )}
                        </Box>

                        {/* Final Step */}
                        {activeStep === steps.length && (
                            <Box mt={4} textAlign="center" py={4}>
                                <CheckCircle sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                                <Typography variant="h5" gutterBottom color="success.main">
                                    Course Created Successfully!
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Your program and course have been successfully created and saved.
                                </Typography>
                                <Button
                                    variant="outlined"
                                    sx={{ mt: 3 }}
                                    onClick={() => {
                                        setActiveStep(0);
                                        setProgramData({
                                            name: '',
                                            code: '',
                                            duration: '',
                                            fees: '',
                                            location: '',
                                            university: 0,
                                        });
                                        setCourseData({
                                            summary: '',
                                            qualifications: '',
                                            poster: null,
                                            rating: '',
                                            department: '',
                                            credit_hours: '',
                                            application_status: '',
                                            course: 0
                                        });
                                        setProgramId(null);
                                    }}
                                >
                                    Create Another Course
                                </Button>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </Fade>
    );
};

export default CourseCreationWizard;