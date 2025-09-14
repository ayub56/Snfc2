
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Login from '../components/portal/Login';
import Dashboard from '../components/portal/Dashboard';

interface PortalProps {
  navigateToPublic: () => void;
}

const Portal: React.FC<PortalProps> = ({ navigateToPublic }) => {
  const { isSignedIn } = useAuth();

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {isSignedIn ? (
        <Dashboard navigateToPublic={navigateToPublic} />
      ) : (
        <Login navigateToPublic={navigateToPublic} />
      )}
    </div>
  );
};

export default Portal;
