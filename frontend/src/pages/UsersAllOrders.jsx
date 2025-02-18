import React, { useEffect, useState } from "react";
import Container from "../components/common/Container";
import { useSelector } from "react-redux";
import axios from "axios";
import Flex from "../components/common/Flex";
import OrderCard from "../components/common/OrderCard";

const UsersAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.account.account); // get user info

  // fetch user order's
  const fetchOrders = async () => {
    try {
      let res = await axios.get(
        `http://localhost:5000/api/v1/order/single/${user.user.id}`,
      );
      setOrders(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <main className="py-[80px]">
      <Container>
        <h1 className="text-2xl font-semibold text-primaryRed">
          All Order's History
        </h1>

        <section className="mt-10">
          {orders.map((data, i) => (
            <OrderCard key={i} data={data} />
          ))}
        </section>
      </Container>
    </main>
  );
};

export default UsersAllOrders;
