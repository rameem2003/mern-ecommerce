import React from "react";

const CategorySkeleton = ({ className }) => {
  return (
    <div
      className={`${className} animate-pulse rounded-xl border border-gray-300 bg-white p-4 shadow-lg`}
    >
      {/* Placeholder for image */}
      <div className="mx-auto h-24 w-24 rounded-md bg-gray-300"></div>

      {/* Placeholder for text */}
      <div className="mt-4">
        <div className="mx-auto h-4 w-3/4 rounded bg-gray-300"></div>
      </div>
    </div>
  );
};

export default CategorySkeleton;
