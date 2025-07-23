import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimationProvider } from './contexts/AnimationContext';
import AppRoutes from './routes';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure the page is fully loaded before showing content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <AnimationProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <AppRoutes />
          </Suspense>
        </AnimationProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;