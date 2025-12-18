import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Clock, Users, Star, BookOpen, Calendar, DollarSign, ChevronRight, Award, Globe, GraduationCap, Bookmark, Share2 } from 'lucide-react';

const CourseDetailPage = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const location = useLocation();
    const [course, setCourse] = useState(null);
    let courseFromState = location.state?.from || null;


    // Sample course data structure that matches CourseCatalog
    const sampleCourses = [
        {
            id: 1,
            image: "https://admin.expatica.com/uk/wp-content/uploads/sites/10/2023/11/uk-universities-1536x1024.jpg",
            title: "Advanced React Development",
            code: "REACT-401",
            level: "Advanced",
            enrollmentStatus: "Open",
            department: "Computer Science",
            rating: 4.8,
            instructor: "John Doe",
            credits: 4,
            duration: "12 Weeks",
            enrolledStudents: 35,
            maxStudents: 50,
            price: 299,
            schedule: ["Mon 10AM-12PM", "Wed 2PM-4PM", "Fri 11AM-1PM"],
            description: "The MSc in Biotechnology, Bioprocessing and Business Management is designed to equip students with the advanced knowledge and skills needed to excel in the rapidly evolving biotechnology sector.",
            skills: [
                "Advanced bioprocessing techniques",
                "Business strategy development",
                "Research and development management",
                "Regulatory affairs knowledge",
                "Project management skills",
                "Commercialization of biotech products"
            ],
            modules: [
                { name: "Advanced Bioprocessing Engineering", credits: 15 },
                { name: "Business Strategy in Biotechnology", credits: 15 },
                { name: "Research Methods and Data Analysis", credits: 15 }
            ],
            requirements: {
                academic: "A first or upper second class undergraduate degree in a related subject",
                language: "IELTS: 6.5 overall with no component below 6.0"
            }
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y291cnNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
            title: "Biotechnology, Bioprocessing and Business Management (MSc)",
            code: "BIO-MSC-2024",
            level: "Postgraduate",
            enrollmentStatus: "Open",
            department: "School of Life Sciences",
            rating: 4.7,
            instructor: "Prof. Dr. Mihaila",
            credits: 180,
            duration: "1 year full-time",
            enrolledStudents: 42,
            maxStudents: 60,
            price: 28410,
            schedule: ["Tue 1PM-3PM", "Thu 1PM-3PM"],
            description: "Develop innovative technologies and enhance business capabilities in the biotechnology sector. This programme combines cutting-edge scientific training with essential business management principles.",
            skills: [
                "Advanced bioprocessing techniques",
                "Business strategy development",
                "Research and development management",
                "Regulatory affairs knowledge",
                "Project management skills",
                "Commercialization of biotech products",
                "Data analysis and interpretation",
                "Leadership and team collaboration"
            ],
            modules: [
                { name: "Advanced Bioprocessing Engineering", credits: 15 },
                { name: "Business Strategy in Biotechnology", credits: 15 },
                { name: "Research Methods and Data Analysis", credits: 15 },
                { name: "Regulatory Affairs and Quality Management", credits: 15 },
                { name: "Innovation and Commercialization", credits: 15 },
                { name: "Leadership in Scientific Organizations", credits: 15 }
            ],
            requirements: {
                academic: "A first or upper second class undergraduate degree (or equivalent) in Biotechnology, Biochemistry, Biology, or Chemical Engineering",
                language: "IELTS: 6.5 overall with no component below 6.0 or equivalent"
            },
            startDate: "September 2024",
            faculty: "Faculty of Science",
            location: "University of Warwick, Coventry",
            tuition: {
                home: "£12,250",
                international: "£28,410"
            },
            applicationDeadline: "31 July 2024",
            studyMode: "Full-time",
            ranking: {
                uk: "Top 10 in the UK",
                world: "74th in the World"
            }
        }
    ];

    useEffect(() => {   
        // Get course ID from URL parameters
        const searchParams = new URLSearchParams(location.search);
        const courseId = parseInt(searchParams.get('id')) || 2; // Default to Biotechnology course

        // Find the course by ID
        const selectedCourse = sampleCourses.find(c => c.id === courseId) || sampleCourses[1];
        setCourse(selectedCourse);
    }, [location]);

    if (!course) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
    }

    const enrollmentPercentage = (course.enrolledStudents / course.maxStudents) * 100;

    return (
        <div
            className="min-h-screen bg-gray-50"
        >
            {/* Overlay for better readability */}
            <div className="min-h-screen bg-black bg-opacity-50">
                {/* Image container with proper sizing */}
                <div className="w-full h-96 overflow-hidden"> {/* Adjust height as needed */}
                    <img
                        src={courseFromState.image}
                        className="w-full h-full object-cover object-center"
                        alt={courseFromState.title}
                    />
                </div>

                {/* Header */}
                <div className="bg-blue-900 bg-opacity-90 text-white py-12" >
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                            <div className="flex-1">
                                <span className="inline-block bg-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                                    {course.level}
                                </span>
                                <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                                <p className="text-xl opacity-90 mb-6">{course.description?.substring(0, 100)}...</p>

                                <div className="flex flex-wrap gap-4 mb-6">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5" />
                                        <span>{course.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5" />
                                        <span>Starts: {course.startDate || "September 2024"}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Award className="w-5 h-5" />
                                        <span>{course.credits} credits</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="w-5 h-5" />
                                        <span>${course.price}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white bg-opacity-95 rounded-lg p-6 text-gray-900 w-full md:w-80">
                                <h3 className="font-bold text-lg mb-4">Course At a Glance</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="font-medium">Study Mode:</span>
                                        <span>{course.studyMode || "Full-time"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Application Deadline:</span>
                                        <span>{course.applicationDeadline || "31 July 2024"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Department:</span>
                                        <span>{course.department}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Enrollment:</span>
                                        <span>{course.enrolledStudents}/{course.maxStudents} students</span>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-col gap-3">
                                    <button className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                                        Apply Now
                                    </button>
                                    <button className="border border-blue-700 text-blue-700 hover:bg-blue-50 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                                        <Bookmark className="w-5 h-5" />
                                        Save Course
                                    </button>
                                    <button className="border border-gray-300 hover:bg-gray-100 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                                        <Share2 className="w-5 h-5" />
                                        Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rest of your content remains the same */}
                {/* Navigation Tabs */}
                <div className="bg-white bg-opacity-95 border-b">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex overflow-x-auto">
                            {['overview', 'curriculum', 'admissions', 'careers', 'fees'].map((tab) => (
                                <button
                                    key={tab}
                                    className={`px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content Column */}
                        <div className="lg:col-span-2">
                            {activeTab === 'overview' && (
                                <div className="space-y-8">
                                    <section className="bg-white bg-opacity-95 rounded-xl p-6">
                                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Course Overview</h2>
                                        <div className="prose max-w-none">
                                            <p className="text-lg text-gray-700 mb-4">
                                                {course.description}
                                            </p>
                                            <p className="text-gray-700">
                                                You'll learn from world-class academics and industry professionals, gaining hands-on experience with state-of-the-art equipment and techniques while developing the business acumen needed to bring scientific innovations to market.
                                            </p>
                                        </div>
                                    </section>

                                    <section className="bg-white bg-opacity-95 rounded-xl p-6">
                                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Skills You'll Gain</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {course.skills.map((skill, index) => (
                                                <div key={index} className="flex items-start gap-3">
                                                    <div className="bg-blue-100 p-2 rounded-full mt-1">
                                                        <Award className="w-4 h-4 text-blue-700" />
                                                    </div>
                                                    <span className="text-gray-700">{skill}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section className="bg-white bg-opacity-95 rounded-xl p-6">
                                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Why Choose This Course?</h2>
                                        <div className="bg-blue-50 rounded-xl p-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="bg-white p-3 rounded-lg shadow-sm">
                                                        <Globe className="w-6 h-6 text-blue-700" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 mb-2">Global Recognition</h3>
                                                        <p className="text-gray-700 text-sm">University of Warwick is ranked 74th globally and top 10 in the UK for Life Sciences.</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <div className="bg-white p-3 rounded-lg shadow-sm">
                                                        <GraduationCap className="w-6 h-6 text-blue-700" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 mb-2">Industry Connections</h3>
                                                        <p className="text-gray-700 text-sm">Strong ties with biotech companies provide networking and employment opportunities.</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <div className="bg-white p-3 rounded-lg shadow-sm">
                                                        <BookOpen className="w-6 h-6 text-blue-700" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 mb-2">Interdisciplinary Approach</h3>
                                                        <p className="text-gray-700 text-sm">Combine scientific expertise with business acumen for comprehensive career preparation.</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <div className="bg-white p-3 rounded-lg shadow-sm">
                                                        <Users className="w-6 h-6 text-blue-700" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 mb-2">Expert Faculty</h3>
                                                        <p className="text-gray-700 text-sm">Learn from leading academics and industry professionals with real-world experience.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            )}

                            {activeTab === 'curriculum' && (
                                <div className="bg-white bg-opacity-95 rounded-xl p-6">
                                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Course Curriculum</h2>
                                    <div className="space-y-6">
                                        <div className="bg-white border rounded-lg overflow-hidden">
                                            <div className="bg-gray-50 px-6 py-4 border-b">
                                                <h3 className="font-semibold text-gray-900">Core Modules</h3>
                                            </div>
                                            <div className="divide-y">
                                                {course.modules.map((module, index) => (
                                                    <div key={index} className="px-6 py-4 flex justify-between items-center">
                                                        <span className="text-gray-700">{module.name}</span>
                                                        <span className="text-sm text-gray-500">{module.credits} credits</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-white border rounded-lg overflow-hidden">
                                            <div className="bg-gray-50 px-6 py-4 border-b">
                                                <h3 className="font-semibold text-gray-900">Research Project</h3>
                                            </div>
                                            <div className="px-6 py-4">
                                                <p className="text-gray-700 mb-4">
                                                    A significant research project allows students to apply their knowledge to a real-world problem in biotechnology or bioprocessing, often in collaboration with industry partners.
                                                </p>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700">Research Dissertation</span>
                                                    <span className="text-sm text-gray-500">60 credits</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'admissions' && (
                                <div className="bg-white bg-opacity-95 rounded-xl p-6">
                                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Admissions Requirements</h2>
                                    <div className="space-y-6">
                                        <div className="bg-white border rounded-lg overflow-hidden">
                                            <div className="bg-gray-50 px-6 py-4 border-b">
                                                <h3 className="font-semibold text-gray-900">Academic Requirements</h3>
                                            </div>
                                            <div className="px-6 py-4">
                                                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                                    <li>{course.requirements.academic}</li>
                                                    <li>International equivalents are accepted</li>
                                                    <li>Relevant professional experience may be considered for applicants who don't meet the formal academic requirements</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="bg-white border rounded-lg overflow-hidden">
                                            <div className="bg-gray-50 px-6 py-4 border-b">
                                                <h3 className="font-semibold text-gray-900">Language Requirements</h3>
                                            </div>
                                            <div className="px-6 py-4">
                                                <p className="text-gray-700 mb-4">For non-native English speakers, one of the following:</p>
                                                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                                    <li>{course.requirements.language}</li>
                                                    <li>TOEFL: 92 overall with minimum scores of 21 in Listening, 21 in Writing, 22 in Reading and 23 in Speaking</li>
                                                    <li>Pearson Test of English: 62 with no less than 59 in any component</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-white bg-opacity-95 rounded-xl shadow-sm p-6">
                                <h3 className="font-bold text-lg mb-4">Contact Us</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-600">Course Director</p>
                                        <p className="font-medium">{course.instructor}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Admissions Office</p>
                                        <p className="font-medium">pgadmissions@warwick.ac.uk</p>
                                        <p className="text-sm">+44 (0)24 7652 4586</p>
                                    </div>
                                    <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors">
                                        Request Information
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white bg-opacity-95 rounded-xl shadow-sm p-6">
                                <h3 className="font-bold text-lg mb-4">Enrollment Status</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700">Current Enrollment</span>
                                        <span className="font-semibold">{course.enrolledStudents}/{course.maxStudents}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-300 ${enrollmentPercentage >= 90
                                                ? 'bg-red-500'
                                                : enrollmentPercentage >= 70
                                                    ? 'bg-yellow-500'
                                                    : 'bg-green-500'
                                                }`}
                                            style={{ width: `${enrollmentPercentage}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700">Status</span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${course.enrollmentStatus === 'Open' ? 'bg-green-100 text-green-800' :
                                            course.enrollmentStatus === 'Waitlist' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {course.enrollmentStatus}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white bg-opacity-95 rounded-xl shadow-sm p-6">
                                <h3 className="font-bold text-lg mb-4">University Rankings</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700">UK Ranking</span>
                                        <span className="font-semibold">Top 10</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700">World Ranking</span>
                                        <span className="font-semibold">74th</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700">Research Excellence</span>
                                        <span className="font-semibold">87%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-blue-900 bg-opacity-90 text-white py-16">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold mb-6">Ready to Take the Next Step?</h2>
                        <p className="text-xl mb-8 max-w-3xl mx-auto">
                            Join a world-leading institution and advance your career in the dynamic field of biotechnology.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-blue-900 hover:bg-blue-50 py-3 px-8 rounded-lg font-semibold text-lg transition-colors">
                                Apply Now
                            </button>
                            <button className="border border-white text-white hover:bg-blue-800 py-3 px-8 rounded-lg font-semibold text-lg transition-colors">
                                Request Prospectus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailPage;