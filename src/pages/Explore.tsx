import React, { useEffect, useRef, useState } from 'react';
import { Clock, Users, Star, BookOpen, DollarSign, Search, Filter, Grid, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCourse } from '../../API/courseApi'; // adjust path

const ExploreCatalog = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // 🔹 Fetch courses from API
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await getCourse();
      setCourses(res.results || []);
    } catch (err) {
      console.error('Error fetching courses', err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Filter logic
  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.location?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const handleNavigate = (course) => {
    navigate('/course-details', { state: { course } });
  };

  if (loading) {
    return <div className="text-center py-20">Loading courses...</div>;
  }

  return (
    <div ref={scrollRef} className="min-h-screen bg-gray-50 py-8 px-4 mt-5">
      <div className="max-w-7xl mx-auto">

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Count */}
        <p className="text-gray-600 mb-4">
          Showing {filteredCourses.length} of {courses.length} courses
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden"
            >
              {/* Image */}
              <div className="h-48 bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{course.name}</h3>
                <p className="text-sm text-blue-600 mb-2">{course.location}</p>

                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{course.average_rating || 0}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-500" />
                    {course.duration} Years
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-orange-500" />
                    ₹{course.fees}
                  </div>
                </div>

                <button
                  onClick={() => handleNavigate(course)}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Data */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No courses found
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreCatalog;
