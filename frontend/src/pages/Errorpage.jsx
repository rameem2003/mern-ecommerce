import React from "react";
import { Link } from "react-router-dom";

const Errorpage = () => {
  return (
    <main className="py-[140px]">
      <h1 className="text-center text-[110px] font-medium text-black">
        404 Not Found
      </h1>

      <p className="text-center text-[16px] font-normal text-black">
        Your visited page not found. You may go home page.
      </p>

      <div className="mt-[80px] text-center">
        <Link
          to="/"
          className="inline-block rounded-[4px] bg-primaryRed px-12 py-4 text-[16px] text-white"
        >
          Back to home page
        </Link>
      </div>
    </main>
  );
};

export default Errorpage;
