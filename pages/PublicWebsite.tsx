
import React from 'react';
import { GraduationCapIcon } from '../components/icons';
import HeroSection from '../components/public/HeroSection';
import AboutSection from '../components/public/AboutSection';
import CoursesSection from '../components/public/CoursesSection';
import AnnouncementsSection from '../components/public/AnnouncementsSection';
import Footer from '../components/Footer';

interface PublicWebsiteProps {
  navigateToPortal: () => void;
}

const Header: React.FC<PublicWebsiteProps> = ({ navigateToPortal }) => {
  const navLinks = ['Home', 'About', 'Courses', 'Announcements', 'Contact'];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <GraduationCapIcon className="h-8 w-8 text-brand-primary" />
          <span className="text-xl font-bold text-brand-dark">EduSys</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-gray-600 hover:text-brand-primary transition-colors duration-300">
              {link}
            </a>
          ))}
        </div>
        <button
          onClick={navigateToPortal}
          className="bg-brand-primary hover:bg-brand-dark text-white font-bold py-2 px-6 rounded-full transition-transform duration-300 ease-in-out hover:scale-105"
        >
          Admin Portal
        </button>
      </nav>
    </header>
  );
};

const PublicWebsite: React.FC<PublicWebsiteProps> = ({ navigateToPortal }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header navigateToPortal={navigateToPortal} />
      <main className="flex-grow">
        <HeroSection navigateToPortal={navigateToPortal} />
        <AboutSection />
        <CoursesSection />
        <AnnouncementsSection />
      </main>
      <Footer />
    </div>
  );
};

export default PublicWebsite;
