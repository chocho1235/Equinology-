import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#3CAAFF] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[#3CAAFF] text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner; 