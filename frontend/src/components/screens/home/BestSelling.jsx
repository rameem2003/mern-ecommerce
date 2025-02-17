import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../common/Container";
import Title from "../../common/Title";
import ItemCardProtrait from "../../common/ItemCardProtrait";
import ProductListSkeleton from "../../common/ProductListSkeleton";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BestSelling = () => {
  const [featured, setFeatured] = useState([]); // get all hot sell products

  // fetch hot sell products
  const fetchFeaturedProducts = async () => {
    try {
      let res = await axios.get(
        "http://localhost:5000/api/v1/product/featured",
      );
      setFeatured(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };
  return (
    <section className="mt-[70px]">
      <Container>
        <div className="relative">
          <Title title="This Month" subTitle="Best Selling Products" />

          <Link className="absolute right-0 top-12 block rounded-[4px] bg-primaryRed px-12 py-4 text-[16px] text-white">
            View All
          </Link>

          <div className="mt-[31px]">
            {featured.length > 0 ? (
              <div className="slider-container">
                <Slider {...settings}>
                  {featured.map((p, i) => (
                    <ItemCardProtrait
                      data={p}
                      key={p._id}
                      className="mx-auto w-[90%]"
                    />
                  ))}
                </Slider>
              </div>
            ) : (
              <ProductListSkeleton />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BestSelling;
