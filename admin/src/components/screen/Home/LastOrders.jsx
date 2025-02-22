import React from "react";

const LastOrders = () => {
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
                Contact
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
            <tr className="odd:bg-blue-50">
              <td className="pl-4 w-8">
                <span>789798798789</span>
              </td>
              <td className="p-4 text-sm text-gray-800">Louis Vuitton</td>
              <td className="p-4 text-sm text-gray-800">
                <span className="w-[68px] block text-center py-1 border border-green-500 text-green-600 rounded text-xs">
                  Active
                </span>
              </td>
              <td className="p-4 text-sm text-gray-800">50000</td>

              <td className="p-4 text-sm text-gray-800">
                <div className="flex items-center cursor-pointer">
                  <img
                    src="https://readymadeui.com/profile_4.webp"
                    className="w-7 h-7 rounded-full shrink-0"
                  />
                  <div className="ml-4">
                    <p className="text-sm text-gray-800">Gladys Jones</p>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <svg
                  className="w-[18px] h-4 inline mr-1"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                    fill="#facc15"
                  />
                </svg>
              </td>
              <td className="p-4">
                <button className="w-[68px] block text-center py-1 border border-green-500 text-green-600 rounded text-xs">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LastOrders;
