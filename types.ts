
export interface Announcement {
  id: number;
  title: string;
  description: string;
  created_at: string;
  date: string;
}

export interface Course {
  id: number;
  name: string;
  description: string;
  duration: string;
  department: string;
  created_at: string;
}

export interface Profile {
  id: string; // Clerk user ID
  full_name: string;
  email: string;
  role: 'student' | 'clerk' | 'teacher';
  created_at: string;
}
