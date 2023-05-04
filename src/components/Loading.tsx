import React from 'react';

export default function Loading () {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <div className="mt-2 text-gray-600">Loading...</div>
      </div>
    </div>
  );
};