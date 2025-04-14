import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="w-8 h-8 border-4 border-[#3CAAFF] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner; 