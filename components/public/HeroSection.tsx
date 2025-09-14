
import React from 'react';

interface HeroSectionProps {
    navigateToPortal: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ navigateToPortal }) => {
  return (
    <section id="home" className="relative bg-brand-primary text-white py-32 px-6 text-center">
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-20" 
            style={{ backgroundImage: "url('https://picsum.photos/1600/900?grayscale&blur=2')" }}>
        </div>
        <div className="relative container mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight animate-fade-in-down">
                Empowering the Future of Education
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-brand-light animate-fade-in-up">
                A modern, integrated management system designed for the dynamic needs of today's schools and colleges.
            </p>
            <div className="flex justify-center space-x-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <a href="#courses" className="bg-white text-brand-primary font-bold py-3 px-8 rounded-full transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg">
                    Explore Courses
                </a>
                <button onClick={navigateToPortal} className="bg-brand-accent hover:bg-blue-400 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg">
                    Clerk Login
                </button>
            </div>
        </div>
    </section>
  );
};

export default HeroSection;
