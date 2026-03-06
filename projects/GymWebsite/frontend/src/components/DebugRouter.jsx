import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DebugRouter = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('🔄 Route changed to:', location.pathname);
    console.log('📍 Full location object:', location);
  }, [location]);

  // Only show in development
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black text-white text-xs p-2 rounded z-50 opacity-75">
      Current Route: {location.pathname}
    </div>
  );
};

export default DebugRouter;