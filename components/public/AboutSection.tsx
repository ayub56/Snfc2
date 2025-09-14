
import React from 'react';
import { BuildingIcon } from '../icons';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-brand-dark mb-4">About Our Institution</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Committed to excellence, innovation, and fostering a community of lifelong learners.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img src="https://picsum.photos/600/400?random=1" alt="Campus" className="rounded-lg shadow-2xl w-full h-auto object-cover" />
          </div>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="bg-brand-light text-brand-primary p-3 rounded-full">
                  <BuildingIcon className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-dark">Our Mission</h3>
                <p className="text-gray-600 mt-2">
                  To provide accessible, high-quality education that equips students with the knowledge and skills needed to succeed in a rapidly changing world.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
               <div className="flex-shrink-0">
                <div className="bg-brand-light text-brand-primary p-3 rounded-full">
                  <BuildingIcon className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-dark">Our Vision</h3>
                <p className="text-gray-600 mt-2">
                  To be a leading educational institution recognized for our innovative teaching methods, impactful research, and dedication to student success.
                </p>
              </div>
            </div>
             <div className="flex items-start space-x-4">
               <div className="flex-shrink-0">
                <div className="bg-brand-light text-brand-primary p-3 rounded-full">
                  <BuildingIcon className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-dark">Today's Role</h3>
                <p className="text-gray-600 mt-2">
                    We play a crucial role in shaping future leaders by integrating technology, promoting critical thinking, and nurturing a culture of inclusivity and ethical responsibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
