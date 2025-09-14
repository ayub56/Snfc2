
import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';

interface AuthUser {
  id: string;
  fullName: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isSignedIn: boolean;
  signIn: (email: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const signIn = (email: string) => {
    // In a real app, this would involve Clerk's sign-in flow.
    // Here we mock a user session.
    setUser({
      id: `user_${new Date().getTime()}`,
      fullName: 'Admin Clerk',
      email: email,
    });
  };

  const signOut = () => {
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    isSignedIn: !!user,
    signIn,
    signOut,
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
