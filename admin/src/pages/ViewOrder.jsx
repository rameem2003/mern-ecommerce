import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Flex from "../components/common/Flex";

const ViewOrder = () => {
  let { id } = useParams();
  const [orderData, setOrderData] = useState(null);

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

  useEffect(() => {
    fetchOrderInfo();
  }, []);

  return (
    <main className="w-full mx-auto mt-8 px-3">
      <h2 className=" text-2xl text-red-600 font-bold">Order info</h2>
      <section className=" mt-10">
        <Flex className="items-center justify-between">
          <span className=" text-base text-gray-600 font-medium">
            Order id : {orderData?._id}
          </span>

          <span className=" text-base text-gray-600 font-medium">
            Date : {new Date(orderData?.updatedAt).toLocaleString()}
          </span>
        </Flex>
      </section>
    </main>
  );
};

export default ViewOrder;
