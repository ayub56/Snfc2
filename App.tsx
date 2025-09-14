
import React, { useState, useCallback } from 'react';
import { AuthProvider } from './hooks/useAuth';
import PublicWebsite from './pages/PublicWebsite';
import Portal from './pages/Portal';

export enum View {
  Public = 'PUBLIC',
  Portal = 'PORTAL',
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Public);

  const navigateToPortal = useCallback(() => {
    setCurrentView(View.Portal);
    window.scrollTo(0, 0);
  }, []);

  const navigateToPublic = useCallback(() => {
    setCurrentView(View.Public);
     window.scrollTo(0, 0);
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        {currentView === View.Public && <PublicWebsite navigateToPortal={navigateToPortal} />}
        {currentView === View.Portal && <Portal navigateToPublic={navigateToPublic} />}
      </div>
    </AuthProvider>
  );
};

export default App;
