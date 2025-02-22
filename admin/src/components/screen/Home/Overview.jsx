import React from "react";

const Overview = () => {
  return (
    <section className=" py-10 font-sans px-5">
      <div className=" w-full mx-auto">
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-5">
          <div className="bg-white rounded-xl border px-7 py-8 shadow-lg">
            <p className="text-gray-400 text-base font-semibold mb-1">
              Todays Sold
            </p>
            <h3 className="text-blue-600 text-3xl font-extrabold">BDT 5.4M+</h3>
          </div>
          <div className="bg-white rounded-xl border px-7 py-8 shadow-lg">
            <p className="text-gray-400 text-base font-semibold mb-1">
              Total Sold
            </p>
            <h3 className="text-blue-600 text-3xl font-extrabold">BDT 80K</h3>
          </div>
          <div className="bg-white rounded-xl border px-7 py-8 shadow-lg">
            <p className="text-gray-400 text-base font-semibold mb-1">
              Order Today
            </p>
            <h3 className="text-blue-600 text-3xl font-extrabold">100K</h3>
          </div>
          <div className="bg-white rounded-xl border px-7 py-8 shadow-lg">
            <p className="text-gray-400 text-base font-semibold mb-1">
              Total Orders
            </p>
            <h3 className="text-blue-600 text-3xl font-extrabold">99.9%</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
