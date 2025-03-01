import axios from "axios";
import React, { useEffect, useState } from "react";

const Overview = () => {
  const [orders, setOrders] = useState([]); // set the initial state of orders

  // fetch the orders from the backend
  const fetchOrders = async () => {
    try {
      let res = await axios.get("http://localhost:5000/api/v1/order/all");
      setOrders(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let today = new Date().toISOString().split("T")[0]; // get the current date

  let filterForToday = orders.filter((order) =>
    order.createdAt.includes(today)
  ); // filter the orders for today
  console.log(filterForToday);

  let totalSold = orders.reduce((total, order) => total + order.grandTotal, 0); // calculate the total sold
  let todaySold = filterForToday.reduce(
    (total, order) => total + order.grandTotal,
    0
  ); // calculate the total sold for today

  useEffect(() => {
    fetchOrders();
  }, []); // fetch the orders when the component mounts
  return (
    <section className=" py-10 font-sans px-5">
      <div className=" w-full mx-auto">
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-5">
          <div className="bg-white rounded-xl border px-7 py-8 shadow-lg">
            <p className="text-gray-400 text-base font-semibold mb-1">
              Todays Sold
            </p>
            <h3 className="text-blue-600 text-3xl font-extrabold">
              BDT {todaySold || "5.4M+"}
            </h3>
          </div>
          <div className="bg-white rounded-xl border px-7 py-8 shadow-lg">
            <p className="text-gray-400 text-base font-semibold mb-1">
              Total Sold
            </p>
            <h3 className="text-blue-600 text-3xl font-extrabold">
              BDT {totalSold || "0"}
            </h3>
          </div>
          <div className="bg-white rounded-xl border px-7 py-8 shadow-lg">
            <p className="text-gray-400 text-base font-semibold mb-1">
              Order Today
            </p>
            <h3 className="text-blue-600 text-3xl font-extrabold">
              {filterForToday.length}
            </h3>
          </div>
          <div className="bg-white rounded-xl border px-7 py-8 shadow-lg">
            <p className="text-gray-400 text-base font-semibold mb-1">
              Total Orders
            </p>
            <h3 className="text-blue-600 text-3xl font-extrabold">
              {orders.length}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
