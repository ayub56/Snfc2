
import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { Announcement } from '../../types';
import { MegaphoneIcon } from '../icons';

const AnnouncementCard: React.FC<{ announcement: Announcement }> = ({ announcement }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-brand-accent">
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold text-brand-dark mb-2">{announcement.title}</h3>
            <span className="text-sm text-gray-500">{new Date(announcement.date).toLocaleDateString()}</span>
        </div>
        <p className="text-gray-600">{announcement.description}</p>
    </div>
);

const AnnouncementsSection: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('date', { ascending: false })
        .limit(4);

      if (error) {
        setError('Failed to fetch announcements.');
        console.error('Error fetching announcements:', error);
      } else {
        setAnnouncements(data || []);
      }
      setLoading(false);
    };

    fetchAnnouncements();
  }, []);

  return (
    <section id="announcements" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <MegaphoneIcon className="h-12 w-12 mx-auto text-brand-primary mb-4"/>
          <h2 className="text-4xl font-bold text-brand-dark mb-4">Latest Announcements</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Stay up-to-date with the latest news and events from our institution.</p>
        </div>
        {loading && <div className="text-center">Loading announcements...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        {!loading && !error && (
            <div className="space-y-6 max-w-4xl mx-auto">
                {announcements.map(announcement => (
                    <AnnouncementCard key={announcement.id} announcement={announcement} />
                ))}
                {announcements.length === 0 && <p className="text-center">No recent announcements.</p>}
            </div>
        )}
      </div>
    </section>
  );
};

export default AnnouncementsSection;
