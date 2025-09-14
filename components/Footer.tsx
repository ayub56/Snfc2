
import React from 'react';
import { GraduationCapIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-brand-dark text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCapIcon className="h-8 w-8 text-brand-accent" />
              <span className="text-2xl font-bold">EduSys</span>
            </div>
            <p className="text-brand-light">Empowering the future of education through technology and innovation.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-brand-accent transition-colors">About Us</a></li>
              <li><a href="#courses" className="hover:text-brand-accent transition-colors">Courses</a></li>
              <li><a href="#announcements" className="hover:text-brand-accent transition-colors">Announcements</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <p className="text-brand-light">123 University Ave, Learning City</p>
            <p className="text-brand-light">Email: contact@edusys.edu</p>
            <p className="text-brand-light">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} EduSys Management System. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
