import React, { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Textarea,
  Select,
  Option,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import Cookies from "js-cookie";

const AddProduct = () => {
  const accessToken = Cookies.get("token"); // access token
  const categories = useSelector((state) => state.category.categories); // fetch all categories
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    sellingPrice: "",
    discountPrice: "",
    stock: "",
    category: "",
    store: "",
    images: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    console.log(e);

    setProduct({ ...product, images: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data = new FormData();
    data.append("name", product.name);
    data.append("description", product.description);
    data.append("sellingPrice", product.sellingPrice);
    data.append("discountPrice", product.discountPrice);
    data.append("stock", product.stock);
    data.append("category", product.category);
    // Append each image file separately
    if (product.images) {
      for (let i = 0; i < product.images.length; i++) {
        data.append("images", product.images[i]);
      }
    }

    try {
      let res = await axios.post(
        "http://localhost:5000/api/v1/product/create",
        data,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Cookie: `token=${accessToken}`,
          },
        }
      );
      setLoading(false);

      Swal.fire({
        title: res.data.msg,
        confirmButtonText: "Ok",
        confirmButtonColor: "green",
        icon: "success",
      });

      console.log(res.data);
    } catch (error) {
      setLoading(false);
      console.log(error);

      Swal.fire({
        title: error.response.data.msg,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: "Ok",
        cancelButtonColor: "red",
        icon: "error",
      });
    }
  };

  return (
    <Card className=" w-full mx-auto mt-8">
      <CardBody>
        <Typography variant="h5" className="text-gray-700 mb-6 font-hind">
          Add Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              label="Product Name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <Textarea
              label="Product Description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          <div className="mb-4">
            <Input
              label="Product Selling Price ($)"
              type="number"
              name="sellingPrice"
              value={product.sellingPrice}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              label="Product Discount Price ($)"
              type="number"
              name="discountPrice"
              value={product.discountPrice}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <Input
              label="Product Stock"
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <Select
              label="Product Category"
              name="category"
              value={product.category}
              onChange={(value) => setProduct({ ...product, category: value })}
              required
            >
              {categories.map((cat, index) => (
                <Option key={index} value={cat._id}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </div>

          <div className="mb-4">
            <Input
              type="file"
              label="Product Images"
              name="images"
              onChange={handleImageChange}
              accept="image/*"
              required
              multiple
            />
          </div>

          {loading ? (
            <TailSpin
              visible={true}
              height="80"
              width="80"
              color="#212121"
              ariaLabel="tail-spin-loading"
              radius="2"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <Button type="submit" color="black" className="w-full">
              Add Product
            </Button>
          )}
        </form>
      </CardBody>
    </Card>
  );
};

export default AddProduct;
