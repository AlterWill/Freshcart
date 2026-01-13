import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center min-h-[60vh]">
      {/* 404 Illustration */}
      <div className="relative mb-8">
        <h1 className="text-9xl font-extrabold text-[var(--brand-light)] tracking-widest select-none">404</h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--brand-primary)] text-white px-4 py-1 rounded shadow-lg rotate-12 font-bold text-lg">
          Page Not Found
        </div>
      </div>
      
      <h2 className="text-4xl font-bold text-theme-primary mb-4">Something's missing.</h2>
      <p className="text-theme-secondary mb-10 max-w-md text-lg">
        We can't seem to find the page you're looking for. It might have been removed, renamed, or is temporarily unavailable.
      </p>

      <Link to="/">
        <Button size="lg" className="shadow-xl hover:-translate-y-1">
          Back to Homepage
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
