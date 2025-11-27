import React from "react";

const RedirectFallback: React.FC = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-xl text-gray-700">Link not found or expired.</p>
    </div>
  );
};

export default RedirectFallback;
