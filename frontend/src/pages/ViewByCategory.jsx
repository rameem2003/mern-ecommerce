import React, { useEffect, useState } from "react";
import Container from "../components/common/Container";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductListPagination from "../components/screens/shop/ProductListPagination";

const ViewByCategory = () => {
  const { id } = useParams();
  const [categoryInfo, setCategoryInfo] = useState(null);

  const fetchCategory = async () => {
    let response = await axios.get(
      `http://localhost:5000/api/v1/category/single/${id}`,
    );

    setCategoryInfo(response.data.data);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <main className="py-10">
      {categoryInfo && (
        <Container>
          <section>
            <h5 className="text-sm text-gray-500">
              Home / Category / {categoryInfo.name}
            </h5>
            <h1 className="mt-5 text-2xl font-bold text-primaryRed">
              Checkout All {categoryInfo.name}
            </h1>
          </section>

          <section className="mt-10">
            <ProductListPagination
              itemsPerPage={6}
              products={categoryInfo.products}
            />
          </section>
        </Container>
      )}
    </main>
  );
};

export default ViewByCategory;
