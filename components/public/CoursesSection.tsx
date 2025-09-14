
import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { Course } from '../../types';
import { BookOpenIcon } from '../icons';

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col">
    <img src={`https://picsum.photos/400/200?random=${course.id}`} alt={course.name} className="w-full h-40 object-cover" />
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-brand-dark mb-2">{course.name}</h3>
      <p className="text-sm text-gray-500 mb-2 font-medium">{course.department}</p>
      <p className="text-gray-600 flex-grow mb-4">{course.description}</p>
      <div className="mt-auto pt-4 border-t border-gray-100">
        <span className="text-sm font-semibold text-brand-primary">{course.duration}</span>
      </div>
    </div>
  </div>
);


const CoursesSection: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        setError('Failed to fetch courses. Please try again later.');
        console.error('Error fetching courses:', error);
      } else {
        setCourses(data || []);
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <BookOpenIcon className="h-12 w-12 mx-auto text-brand-primary mb-4" />
          <h2 className="text-4xl font-bold text-brand-dark mb-4">Our Programs</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover a wide range of courses designed to challenge and inspire.
          </p>
        </div>
        {loading && <div className="text-center">Loading courses...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
            {courses.length === 0 && <p className="text-center col-span-full">No courses available at the moment.</p>}
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
