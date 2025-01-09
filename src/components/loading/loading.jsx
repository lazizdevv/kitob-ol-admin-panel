import React from "react";

export const Loading = () => {
  return (
    <>
      <div className="fixed inset-0 bg-dark bg-opacity-90 flex items-center justify-center z-50 w-full">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
          <p className="text-white text-xl mt-4">Loading...</p>
        </div>
      </div>
    </>
  );
};
