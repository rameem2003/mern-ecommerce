import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Flex from "../components/common/Flex";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";

const ViewOrder = () => {
  let { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [deliveryLoading, setDeliveryLoading] = useState(false);
  const orderRef = useRef(null);

  /**
   * Fetch the order info
   */
  const fetchOrderInfo = async () => {
    try {
      let res = await axios.get(
        `http://localhost:5000/api/v1/order/singlebyid/${id}`
      );

      console.log(res);
      setOrderData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Function for handleDelivery
   */
  const handleDelivery = async (text) => {
    setDeliveryLoading(true);
    try {
      let res = await axios.post(
        `http://localhost:5000/api/v1/order/response/${id}?statusText=${text}`
      );

      setDeliveryLoading(false);
      Swal.fire({
        title: res.data.msg,
        confirmButtonText: "Ok",
        confirmButtonColor: "green",
        icon: "success",
      })
        .then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        })
        .finally(() => {
          location.reload();
        });
    } catch (error) {
      setDeliveryLoading(false);
      console.log(error);

      Swal.fire({
        title: error.response.data.msg,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: "Ok",
        cancelButtonColor: "red",
        icon: "error",
      }).then((result) => {
        if (result.isDismissed) {
          location.reload();
        }
      });
    }
  };

  /**
   * Print The Order Info
   */
  const printOrder = useReactToPrint({
    contentRef: orderRef,
    documentTitle: id,
  });

  useEffect(() => {
    fetchOrderInfo();
  }, []);

  return (
    <main className="w-full mx-auto mt-8 px-3">
      <Flex className="items-center justify-between">
        <h2 className=" text-2xl text-red-600 font-bold">Order info</h2>
        <button
          className=" px-2 py-1 bg-blue-500 font-medium text-lg text-white"
          onClick={printOrder}
        >
          Print
        </button>
      </Flex>
      <section ref={orderRef} className=" mt-10  p-3">
        <Flex className="items-center justify-between">
          <span className=" text-base text-gray-600 font-medium">
            Order id : {orderData?._id}
          </span>

          <span className=" text-base text-gray-600 font-medium">
            TxID : {orderData?.transactionID}
          </span>
          <span className=" text-base text-gray-600 font-medium">
            Date : {new Date(orderData?.updatedAt).toLocaleString()}
          </span>
        </Flex>

        <Flex className="mt-2 items-start justify-between">
          <div>
            <h2 className=" text-4xl font-bold">{orderData?.user.name}</h2>
            <p className=" text-lg font-medium">Phone: {orderData?.phone}</p>
            <p className=" text-lg font-medium">
              Address: {orderData?.address}
            </p>
          </div>

          <div>
            <p className=" text-lg font-semibold capitalize text-red-600">
              Delivery: {orderData?.deliveryStatus}
            </p>
            <p className=" text-lg font-semibold capitalize text-red-600">
              Payment Method: {orderData?.paymentMethod}
            </p>
            <p className=" text-lg font-semibold capitalize text-red-600">
              Payment Status: {orderData?.paymentStatus}
            </p>
          </div>
        </Flex>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500  mt-10">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Unit Price
              </th>
              <th scope="col" className="px-6 py-3">
                Subtotal
              </th>
            </tr>
          </thead>

          <tbody>
            {orderData?.cartItems.map((data, i) => (
              <tr className="bg-white border-b" key={i}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {data.product.name.slice(0, 50)}
                </th>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {data.quantity}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  ৳ {data.product.discountPrice} BDT
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  ৳ {data.quantity * data.product.discountPrice} BDT
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Flex className=" items-center justify-between w-full mt-5">
          <button
            onClick={() => handleDelivery("delivered")}
            disabled={deliveryLoading}
            className={` disabled:bg-gray-400 px-4 py-2 font-semibold text-lg text-white bg-red-500`}
          >
            {deliveryLoading ? "Pls Wait..." : "Go Delivery"}
          </button>
          <h3 className=" font-bold text-3xl text-black mt-5 text-right">
            Grand Total: ৳ {orderData?.grandTotal} BDT
          </h3>
        </Flex>
      </section>
    </main>
  );
};

export default ViewOrder;
