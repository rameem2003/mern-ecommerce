import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const LastOrders = () => {
  const [orders, setOrders] = useState([]); // set the initial state of orders

  // fetch the orders from the backend
  const fetchOrders = async () => {
    try {
      let res = await axios.get("http://localhost:5000/api/v1/order/all");
      setOrders(
        res.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  console.log(orders);

  useEffect(() => {
    fetchOrders();
  }, []); // fetch the orders when the component mounts
  return (
    <section className="py-10 font-sans px-5">
      <h2 className=" text-3xl text-black font-bold my-10">Last Order's</h2>

      <div className="font-[sans-serif] overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="whitespace-nowrap">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-gray-800">
                Order ID
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-800">
                Customer
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-800">
                Status
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-800">
                Price
              </th>

              <th className="p-4 text-left text-sm font-semibold text-gray-800">
                Payment Method
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-800">
                Products
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-800">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            {orders.map((order, i) => (
              <tr className="odd:bg-blue-50" key={order._id}>
                <td className="pl-4 w-8">
                  <span>{order._id}</span>
                </td>
                <td className="p-4 text-sm text-gray-800">{order.user.name}</td>
                <td className="p-4 text-sm text-gray-800">
                  {order.deliveryStatus == "delivered" ? (
                    <span className="w-[68px] capitalize block text-center py-1 border border-green-500 text-green-600 rounded text-xs">
                      delivered
                    </span>
                  ) : order.deliveryStatus == "pending" ? (
                    <span className="w-[68px] capitalize block text-center py-1 border border-orange-500 text-orange-600 rounded text-xs">
                      pending
                    </span>
                  ) : (
                    <span className="w-[68px] capitalize block text-center py-1 border border-blue-500 text-blue-600 rounded text-xs">
                      shipping
                    </span>
                  )}
                </td>
                <td className="p-4 text-sm text-gray-800">
                  {order.grandTotal}
                </td>

                <td className="p-4 text-sm text-gray-800">
                  {order.paymentMethod}
                </td>
                <td className="p-4">{order.cartItems.length}</td>
                <td className="p-4">
                  <Link
                    to={`/view/${order._id}`}
                    className="w-[68px] block text-center py-1 border border-green-500 text-green-600 rounded text-xs"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LastOrders;
