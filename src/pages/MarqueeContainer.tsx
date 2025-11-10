import React, { useState, useEffect } from 'react';
import '../MarqueeContainer.css';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: number;
  image: string;
  title: string;
  code: string;
  level: string;
  enrollmentStatus: string;
  department: string;
  rating: number;
  instructor: string;
  credits: number;
  duration: string;
  enrolledStudents: number;
  maxStudents: number;
  price: number;
  schedule: string[];
}

const MarqueeContainer = () => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchedCourses = [
    {
        id: 1,
        image: "https://warwick.ac.uk/study/postgraduate/courses/pgdip-msc-big-data-digital-futures/cim-big-data.png",
        title: "Big Data and Digital Futures (MSc/PGDip)",
        code: "P-L990 (MSc), P-L991 (PGDip)",
        level: "Advanced",
        enrollmentStatus: "Closed",
        department: "MSc/PGDip",
        rating: 4.8,
        // instructor: "John Doe",
        credits: 20,
        duration: "1 Year",
        enrolledStudents: 0,
        maxStudents: 0,
        price: "-",
        schedule: ["Mon 10AM-12PM", "Wed 2PM-4PM", "Fri 11AM-1PM"]
      },
      {
        id: 2,
        image: "https://warwick.ac.uk/study/postgraduate/courses/pgcert-pgdip-msc-clinical-research-iheed/clinical_research_iheed.jpeg",
        title: " iheed MSc in Clinical Research (PGCert / PGDip / MSc) ",
        code: "PGCert - B94K, PGDip - B94J, MSc - B94H",
        level: "Beginner",
        enrollmentStatus: "Closed",
        department: "PGCert/PGDip/MSc",
        rating: 4.5,
        // instructor: "Sarah Johnson",
        credits: 20,
        duration: "6 - 22 Months",
        enrolledStudents: 0,
        maxStudents: 0,
        price:  "-",
        schedule: ["Tue 1PM-3PM", "Thu 1PM-3PM"]
      },
      {
        id: 3,
        image: "https://warwick.ac.uk/study/postgraduate/courses/pgdip-msc-diabetes-care-iheed/advanced_clinical_practice.jpg",
        title: "Diabetes Care - iheed (PGCert/PGDip/MSc)",
        code: "B90Z - PGCert, B90Z - PGDip, B90Q - MSc",
        level: "Intermediate",
        enrollmentStatus: "Closed",
        department: "PGCert/PGDip/MSc",
        rating: 4.7,
        // instructor: "Michael Chen",
        credits: "-",
        duration: "6 - 24 Months",
        enrolledStudents: 0,
        maxStudents: 0,
        price:  "-",
        schedule: ["Mon 2PM-4PM", "Wed 2PM-4PM", "Fri 10AM-12PM"]
      },
      {
        id: 4,
        image: "https://warwick.ac.uk/study/postgraduate/courses/pgcert-pgdip-msc-diagnostics-data-digital-health-medical-diagnostics/content-blocks/diagnostics_data_and_digital_health.jpg",
        title: "Diagnostics, Data and Digital Health (Medical Diagnostics) (MSc/PGDip/PGCert) ",
        code: "P-H1CB (MSc), P-H1CE (PGDip), P-H1CH (PG Cert)",
        level: "Intermediate",
        enrollmentStatus: "Closed",
        department: "MSc/PGDip/PGCert",
        rating: 4.9,
        // instructor: "Emily Rodriguez",
        credits: 15,
        duration: "1 Year",
        enrolledStudents: 0,
        maxStudents: 0,
        price:  "-",
        schedule: ["Tue 10AM-12PM", "Thu 10AM-12PM"]
      },
      {
        id: 5,
        image: "https://warwick.ac.uk/study/postgraduate/courses/pgcert-pgdip-msc-diagnostics-data-digital-health-medical-imgaging/content-blocks/diagnostics_data_and_digital_health.jpg",
        title: " Diagnostics, Data and Digital Health (Medical Imaging) (MSc/PGDip/PGCert) ",
        code: "P-H1CC (MSc), P-H1CF (PGDip),P-H1CJ (PG Cert)",
        level: "Beginner",
        enrollmentStatus: "Closed",
        department: "MSc/PGDip/PGCert",
        rating: 4.6,
        // instructor: "Alex Thompson",
        credits: 15,
        duration: "1 Year",
        enrolledStudents: 0,
        maxStudents: 0,
        price:  "-",
        schedule: ["Mon 6PM-8PM", "Wed 6PM-8PM", "Sat 10AM-1PM"]
      },
      {
        id: 6,
        image: "https://warwick.ac.uk/study/postgraduate/courses/msc-medical-biotechnology-business-management/medical-biotechnology-banner.jpg",
        title: " Medical Biotechnology and Business Management (MSc) ",
        code: "P-J7N2 ",
        level: "Advanced",
        enrollmentStatus: "Closed",
        department: "MSc",
        rating: 4.8,
        // instructor: "David Wilson",
        credits: 20,
        duration: "1 Year",
        enrolledStudents: 0,
        maxStudents: 0,
        price:  "-",
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
    
    setCourses(fetchedCourses);
    // setSelectedCourse(fetchedCourses[0]); 
  }, []);

  const handleCourseClick = () => {
    navigate('/explore')
  };

  return (
    <div className="marquee-container">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-3 ">
            <div className="marquee-left-side-main-title">Our Courses</div>
            <div className="marquee-left-side-subtitle">A Comprehensive Catalog</div>
          </div>
          <div className="col-md-6  mt-3 marquee-right-side text-center">
            Browse our extensive selection of technology courses taught by industry experts. 
            Whether you're a beginner or an advanced learner, we have something for everyone.
          </div>
        </div>
      </div>

      <div className="marquee">
        <div className="marquee__group">
          {courses.map(course => (
            <div 
              key={course.id} 
              className={`marquee-item ${selectedCourse?.id === course.id ? 'active' : ''}`}
              onClick={ handleCourseClick}
            >
              <img src={course.image} alt={course.title} />
              <div className="course-title-overlay">{course.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="marquee marquee--borders">
        <div className="marquee marquee--reverse">
          <div className="marquee__group">
            {courses.map(course => (
              <div 
                key={course.id} 
                className={`marquee-item ${selectedCourse?.id === course.id ? 'active' : ''}`}
                onClick={() => handleCourseClick(course)}
              >
                <img src={course.image} alt={course.title} />
                <div className="course-title-overlay">{course.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MarqueeContainer;