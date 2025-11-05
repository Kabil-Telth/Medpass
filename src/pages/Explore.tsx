import React, { useEffect, useRef, useState } from 'react';
import { Clock, Users, Star, BookOpen, Calendar, DollarSign, Search, Filter, Grid, List } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const ExploreCatalog = () => {
    const scrollRef = useRef(null);
    // const location = useLocation();
    // const courseDetail = location.state?.course || null;

    // useEffect(() => {
    //     if (courseDetail?.title) {
    //         setSearchTerm(courseDetail.title);
    //     }
    // }, [courseDetail?.title]);

     const courses = [
      {
        id: 1,
        image: "https://warwick.ac.uk/study/postgraduate/courses/pgdip-msc-big-data-digital-futures/cim-big-data.png",
        title: "Big Data and Digital Futures (MSc/PGDip)",
        code: "P-L990 (MSc)",
        level: "Advanced",
        enrollmentStatus: "Closed",
        department: "MSc/PGDip",
        rating: 4.8,
        instructor: "John Doe",
        credits: 4,
        duration: "12 Weeks",
        enrolledStudents: 35,
        maxStudents: 50,
        price: 299,
        schedule: ["Mon 10AM-12PM", "Wed 2PM-4PM", "Fri 11AM-1PM"]
      },
      {
        id: 2,
        image: "https://warwick.ac.uk/study/postgraduate/courses/pgcert-pgdip-msc-clinical-research-iheed/clinical_research_iheed.jpeg",
        title: "MSc in Clinical Research",
        code: "MSc - B94H",
        level: "Beginner",
        enrollmentStatus: "Closed",
        department: "MSc",
        rating: 4.5,
        instructor: "Sarah Johnson",
        credits: 3,
        duration: "8 Weeks",
        enrolledStudents: 42,
        maxStudents: 60,
        price: 199,
        schedule: ["Tue 1PM-3PM", "Thu 1PM-3PM"]
      },
      {
        id: 3,
        image: "https://warwick.ac.uk/study/postgraduate/courses/pgdip-msc-diabetes-care-iheed/advanced_clinical_practice.jpg",
        title: "Diabetes Care - iheed ",
        code: "B90Z - PGCert",
        level: "Intermediate",
        enrollmentStatus: "Closed",
        department: "PGCert",
        rating: 4.7,
        instructor: "Michael Chen",
        credits: 4,
        duration: "14 Weeks",
        enrolledStudents: 48,
        maxStudents: 45,
        price: 349,
        schedule: ["Mon 2PM-4PM", "Wed 2PM-4PM", "Fri 10AM-12PM"]
      },
      {
        id: 4,
        image: "https://warwick.ac.uk/study/postgraduate/courses/pgcert-pgdip-msc-diagnostics-data-digital-health-medical-diagnostics/content-blocks/diagnostics_data_and_digital_health.jpg",
        title: "Data and Digital Health",
        code: "P-H1CE (PGDip)",
        level: "Intermediate",
        enrollmentStatus: "Closed",
        department: "PGDip",
        rating: 4.9,
        instructor: "Emily Rodriguez",
        credits: 4,
        duration: "16 Weeks",
        enrolledStudents: 38,
        maxStudents: 50,
        price: 399,
        schedule: ["Tue 10AM-12PM", "Thu 10AM-12PM"]
      },
      {
        id: 5,
        image: "https://warwick.ac.uk/study/postgraduate/courses/pgcert-pgdip-msc-diagnostics-data-digital-health-medical-imgaging/content-blocks/diagnostics_data_and_digital_health.jpg",
        title: "Diagnostics",
        code: "P-H1CJ (PG Cert)",
        level: "Beginner",
        enrollmentStatus: "Closed",
        department: "PGCert",
        rating: 4.6,
        instructor: "Alex Thompson",
        credits: 3,
        duration: "10 Weeks",
        enrolledStudents: 55,
        maxStudents: 60,
        price: 249,
        schedule: ["Mon 6PM-8PM", "Wed 6PM-8PM", "Sat 10AM-1PM"]
      },
      {
        id: 6,
        image: "https://warwick.ac.uk/study/postgraduate/courses/msc-medical-biotechnology-business-management/medical-biotechnology-banner.jpg",
        title: "Medical Biotechnology and Business Management",
        code: "P-J7N2 ",
        level: "Advanced",
        enrollmentStatus: "Closed",
        department: "MSc",
        rating: 4.8,
        instructor: "David Wilson",
        credits: 4,
        duration: "12 Weeks",
        enrolledStudents: 30,
        maxStudents: 30,
        price: 329,
        schedule: ["Tue 4PM-6PM", "Thu 4PM-6PM"]
      },
      // {
      //   id: 7,
      //   image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y291cnNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      //   title: "UI/UX Design Principles",
      //   code: "UX-201",
      //   level: "Intermediate",
      //   enrollmentStatus: "Open",
      //   department: "Design",
      //   rating: 4.7,
      //   instructor: "Sophia Lee",
      //   credits: 3,
      //   duration: "8 Weeks",
      //   enrolledStudents: 28,
      //   maxStudents: 35,
      //   price: 279,
      //   schedule: ["Mon 1PM-3PM", "Wed 1PM-3PM"]
      // },
      // {
      //   id: 8,
      //   image: "https://admin.expatica.com/uk/wp-content/uploads/sites/10/2023/11/uk-universities-1536x1024.jpg",
      //   title: "Database Management Systems",
      //   code: "DBMS-301",
      //   level: "Intermediate",
      //   enrollmentStatus: "Open",
      //   department: "Computer Science",
      //   rating: 4.4,
      //   instructor: "Robert Brown",
      //   credits: 4,
      //   duration: "14 Weeks",
      //   enrolledStudents: 40,
      //   maxStudents: 50,
      //   price: 319,
      //   schedule: ["Tue 2PM-4PM", "Thu 2PM-4PM", "Fri 2PM-4PM"]
      // },
      // {
      //   id: 9,
      //   image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvdXJzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      //   title: "Mobile App Development with React Native",
      //   code: "MOB-301",
      //   level: "Intermediate",
      //   enrollmentStatus: "Waitlist",
      //   department: "Mobile Development",
      //   rating: 4.6,
      //   instructor: "Jennifer Kim",
      //   credits: 4,
      //   duration: "12 Weeks",
      //   enrolledStudents: 32,
      //   maxStudents: 30,
      //   price: 349,
      //   schedule: ["Mon 4PM-6PM", "Wed 4PM-6PM"]
      // },
      // {
      //   id: 10,
      //   image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvdXJzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      //   title: "Cloud Computing Essentials",
      //   code: "CLOUD-201",
      //   level: "Beginner",
      //   enrollmentStatus: "Open",
      //   department: "Cloud Computing",
      //   rating: 4.3,
      //   instructor: "Kevin Martinez",
      //   credits: 3,
      //   duration: "10 Weeks",
      //   enrolledStudents: 45,
      //   maxStudents: 60,
      //   price: 269,
      //   schedule: ["Tue 6PM-8PM", "Thu 6PM-8PM"]
      // }
    ];

    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [searchTerm, setSearchTerm] = useState('');
    const [levelFilter, setLevelFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const navigate = useNavigate();

    // Filter courses based on search and filters
    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.department.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
        const matchesStatus = statusFilter === 'all' || course.enrollmentStatus === statusFilter;

        return matchesSearch && matchesLevel && matchesStatus;
    });

    const getLevelColor = (level) => {
        switch (level) {
            case 'Beginner':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Intermediate':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Advanced':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getEnrollmentStatusColor = (status) => {
        switch (status) {
            case 'Open':
                return 'bg-green-500 text-white';
            case 'Closed':
                return 'bg-red-500 text-white';
            case 'Waitlist':
                return 'bg-yellow-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    const handleNaviate = (course) => {
        navigate('/course-details', { state: { from: course } });
    }

    return (
        <div ref={scrollRef} style={{ overflowY: 'scroll', height: '200px' }} className="min-h-screen bg-gray-50 py-8 px-4 mt-5 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-1">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Course Catalog</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Browse our extensive catalog of courses and find the perfect learning opportunity for you.
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="relative flex-1 max-w-2xl">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search courses, instructors, or departments..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                                onClick={() => setViewMode('grid')}
                            >
                                <Grid className="w-5 h-5" />
                            </button>
                            <button
                                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                                onClick={() => setViewMode('list')}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">Filter by:</span>
                        </div>

                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={levelFilter}
                            onChange={(e) => setLevelFilter(e.target.value)}
                        >
                            <option value="all">All Levels</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>

                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All Statuses</option>
                            <option value="Open">Open</option>
                            <option value="Waitlist">Waitlist</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                </div>

                {/* Results count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing {filteredCourses.length} of {courses.length} courses
                    </p>
                </div>

                {/* Courses Grid */}
                <div className={viewMode === 'grid' ?
                    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" :
                    "grid grid-cols-1 gap-6 max-w-4xl mx-auto"
                }>
                    {filteredCourses.map(course => {
                        return (
                            <div key={course.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group h-full flex flex-col">
                                {/* Course Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* <div className="absolute top-4 left-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getLevelColor(course.level)}`}>
                                            {course.level}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getEnrollmentStatusColor(course.enrollmentStatus)}`}>
                                            {course.enrollmentStatus}
                                        </span>
                                    </div> */}
                                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                                        <span className="text-sm font-bold text-gray-800">{course.code}</span>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                                                {course.title}
                                            </h3>
                                            <p className="text-sm text-blue-600 font-medium">{course.department}</p>
                                        </div>
                                        <div className="flex items-center gap-1 ml-4">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-sm font-semibold text-gray-700">{course.rating}</span>
                                        </div>
                                    </div>

                                    {/* Instructor */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">
                                                {course.instructor.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <span className="text-gray-700 font-medium">{course.instructor}</span>
                                    </div>

                                    {/* Course Details Grid */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="w-4 h-4 text-blue-500" />
                                            <span className="text-sm text-gray-600">{course.credits} Credits</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-green-500" />
                                            <span className="text-sm text-gray-600">{course.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-purple-500" />
                                            <span className="text-sm text-gray-600">{course.enrolledStudents}/{course.maxStudents}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="w-4 h-4 text-orange-500" />
                                            <span className="text-sm text-gray-600">${course.price}</span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 transform hover:scale-105 ${course.enrollmentStatus === 'Open'
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                                            : course.enrollmentStatus === 'Waitlist'
                                                ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg hover:shadow-xl'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                        disabled={course.enrollmentStatus === 'Closed'}
                                        onClick={() => handleNaviate(course)}
                                    >
                                        {course.enrollmentStatus === 'Open' && 'Enroll Now'}
                                        {course.enrollmentStatus === 'Waitlist' && 'Join Waitlist'}
                                        {course.enrollmentStatus === 'Closed' && 'Enrollment Closed'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* No results message */}
                {filteredCourses.length === 0 && (
                    <div className="text-center py-12">
                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <Search className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No courses found</h3>
                        <p className="text-gray-500">
                            Try adjusting your search or filter criteria to find what you're looking for.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExploreCatalog;