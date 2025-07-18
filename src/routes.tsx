import React, { lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumb from './components/Breadcrumb';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages (except HomePage)
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Layout component that provides consistent structure
const Layout: React.FC = () => (
  <>
    <Header />
    <Breadcrumb />
    <main className="min-h-screen">
      <Outlet />
    </main>
    <Footer />
  </>
);

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Home */}
        <Route index element={<HomePage />} />

        {/* Services */}
        <Route path="services" element={<ServicesPage />} />

        {/* Articles */}
        <Route path="articles" element={<ArticlePage />} />
        <Route path="articles/:slug" element={<ArticlePage />} />

        {/* Blog */}
        <Route path="blog" element={<BlogPage />} />

        {/* Contact */}
        <Route path="contact" element={<ContactPage />} />

        {/* 404 - Catch all */}
        <Route
          path="*"
          element={
            <ErrorBoundary>
              <NotFoundPage />
            </ErrorBoundary>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes; 