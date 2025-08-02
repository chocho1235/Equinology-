import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimationProvider } from './contexts/AnimationContext';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AnimationProvider>
          <AppRoutes />
        </AnimationProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;