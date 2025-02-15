import React, { useState } from "react";
import ProductListPagination from "./ProductListPagination";
import { useSelector } from "react-redux";

const AllproductsDisplay = () => {
  const [count, setCount] = useState(6);
  const allProducts = useSelector((state) => state.allproducts.products);
  return (
    <section>
      <div className="w-4/12">
        <label htmlFor="countries" className="mb-2 block text-sm font-medium">
          View by
        </label>
        <select
          onChange={(e) => setCount(parseInt(e.target.value))}
          id="countries"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
        >
          <option selected>View by</option>
          <option value={6}>6 Items</option>
          <option value={12}>12 Items</option>
          <option value={24}>24 Items</option>
        </select>
      </div>

      <div className="mt-5">
        <ProductListPagination itemsPerPage={count} products={allProducts} />
      </div>
    </section>
  );
};

export default AllproductsDisplay;
