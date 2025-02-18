import React from "react";
import Flex from "./Flex";
import Image from "./Image";

const OrderCard = ({ data }) => {
  return (
    <div className="rounded-lg p-3 shadow-lg">
      <Flex className="items-center justify-between">
        <span className="rounded-md bg-primaryRed px-2 py-1 font-medium text-white">
          Total: BDT {data.grandTotal}
        </span>
        <span className="rounded-md bg-primaryGrey px-2 py-1 font-medium capitalize text-white">
          Status: {data.paymentStatus} ({data.paymentMethod})
        </span>
      </Flex>

      <div className="mt-4">
        {data?.cartItems.map((item, i) => (
          <Flex key={i} className="items-center justify-between">
            <Flex className="items-center gap-2">
              <div className="h-20 w-20 bg-gray-500">
                <Image src={item.product.images[0]} alt={item.product.name} />
              </div>
              <div>
                <h3 className="text-xl font-bold">{item.product.name}</h3>
                <h4>{item.product.description.slice(0, 80)}...</h4>
                <h5>Quantity : x{item.quantity}</h5>
              </div>
            </Flex>

            <span className="rounded-md bg-primaryRed px-2 py-1 font-medium text-white">
              Sub Total: BDT {item.quantity * item.product.discountPrice}
            </span>
          </Flex>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
