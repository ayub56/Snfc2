
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../services/supabaseClient';
import { Announcement, Profile } from '../../types';
import {
  GraduationCapIcon, HomeIcon, LogOutIcon, PlusCircleIcon,
  UserGroupIcon, ClipboardListIcon, UserCheckIcon, MegaphoneIcon
} from '../icons';

type DashboardView = 'overview' | 'announcements' | 'students' | 'enrollments' | 'teachers';

const AddAnnouncementForm: React.FC<{ onAdd: () => void }> = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);
        
        const { error } = await supabase.from('announcements').insert([{ title, description, date }]);

        if (error) {
            setMessage({ type: 'error', text: 'Failed to add announcement.' });
            console.error(error);
        } else {
            setMessage({ type: 'success', text: 'Announcement added successfully!' });
            setTitle('');
            setDescription('');
            setDate(new Date().toISOString().split('T')[0]);
            onAdd();
        }
        setIsSubmitting(false);
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Add New Announcement</h3>
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"/>
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"/>
            </div>
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"/>
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-brand-primary text-white py-2 px-4 rounded-md hover:bg-brand-dark disabled:bg-gray-400 transition-colors">
                {isSubmitting ? 'Submitting...' : 'Add Announcement'}
            </button>
            {message && <p className={`text-sm mt-2 ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message.text}</p>}
        </form>
    );
};


const AnnouncementsManager: React.FC = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAnnouncements = useCallback(async () => {
        setLoading(true);
        const { data } = await supabase.from('announcements').select('*').order('date', { ascending: false });
        setAnnouncements(data || []);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchAnnouncements();
    }, [fetchAnnouncements]);

    return (
        <div>
            <AddAnnouncementForm onAdd={fetchAnnouncements} />
             <div className="mt-8 bg-white rounded-lg shadow">
                 <h3 className="text-xl font-semibold text-gray-800 p-6">Existing Announcements</h3>
                 {loading ? <p className="p-6">Loading...</p> : (
                    <div className="divide-y divide-gray-200">
                     {announcements.map(a => (
                         <div key={a.id} className="p-6">
                             <div className="flex justify-between items-center">
                                 <h4 className="font-semibold text-gray-900">{a.title}</h4>
                                 <p className="text-sm text-gray-500">{new Date(a.date).toLocaleDateString()}</p>
                             </div>
                             <p className="mt-2 text-gray-600">{a.description}</p>
                         </div>
                     ))}
                    </div>
                 )}
            </div>
        </div>
    );
};

const StudentsViewer: React.FC = () => {
    const [students, setStudents] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            const { data } = await supabase.from('profiles').select('*').eq('role', 'student');
            setStudents(data || []);
            setLoading(false);
        };
        fetchStudents();
    }, []);

    return (
         <div className="bg-white rounded-lg shadow overflow-hidden">
            <h3 className="text-xl font-semibold text-gray-800 p-6">Student Roster</h3>
            {loading ? <p className="p-6">Loading students...</p> : (
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {students.map(s => (
                        <tr key={s.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.full_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(s.created_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    );
};

const PlaceholderSection: React.FC<{ title: string }> = ({ title }) => (
    <div className="p-6 bg-white rounded-lg shadow text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-500">This feature is under development and will be available soon.</p>
    </div>
);


const Dashboard: React.FC<{ navigateToPublic: () => void }> = ({ navigateToPublic }) => {
  const { user, signOut } = useAuth();
  const [view, setView] = useState<DashboardView>('overview');

  const navItems: { id: DashboardView; label: string; icon: React.FC<{className?: string}> }[] = [
    { id: 'overview', label: 'Overview', icon: HomeIcon },
    { id: 'announcements', label: 'Announcements', icon: MegaphoneIcon },
    { id: 'students', label: 'Students', icon: UserGroupIcon },
    { id: 'enrollments', label: 'Enrollments', icon: ClipboardListIcon },
    { id: 'teachers', label: 'Assign Teachers', icon: UserCheckIcon },
  ];

  const renderContent = () => {
      switch(view) {
          case 'overview': return <PlaceholderSection title="Dashboard Overview"/>;
          case 'announcements': return <AnnouncementsManager />;
          case 'students': return <StudentsViewer />;
          case 'enrollments': return <PlaceholderSection title="Manage Enrollments"/>;
          case 'teachers': return <PlaceholderSection title="Assign Teachers"/>;
          default: return <PlaceholderSection title="Dashboard Overview"/>;
      }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-dark text-white flex flex-col">
        <div className="h-16 flex items-center justify-center space-x-2 border-b border-brand-primary">
          <GraduationCapIcon className="h-8 w-8" />
          <span className="text-xl font-bold">EduSys Portal</span>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
            {navItems.map(item => (
                 <button
                    key={item.id}
                    onClick={() => setView(item.id)}
                    className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                        view === item.id ? 'bg-brand-primary text-white' : 'hover:bg-brand-secondary hover:text-white'
                    }`}
                >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                </button>
            ))}
        </nav>
        <div className="p-4 border-t border-brand-primary">
          <p className="text-sm font-semibold">{user?.fullName}</p>
          <p className="text-xs text-gray-300">{user?.email}</p>
          <button onClick={signOut} className="w-full mt-4 flex items-center justify-center text-sm px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors">
            <LogOutIcon className="h-5 w-5 mr-2" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-sm flex justify-between items-center px-6">
            <h1 className="text-2xl font-semibold text-gray-800 capitalize">{view}</h1>
            <button onClick={navigateToPublic} className="text-sm text-brand-secondary hover:underline">
                View Public Site &rarr;
            </button>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
