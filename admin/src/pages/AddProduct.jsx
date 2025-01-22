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

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const categories = ["Electronics", "Clothing", "Books", "Furniture", "Toys"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product); // Handle form submission logic
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
              required
            />
          </div>

          <div className="mb-4">
            <Input
              label="Product Price ($)"
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              required
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
                <Option key={index} value={cat}>
                  {cat}
                </Option>
              ))}
            </Select>
          </div>

          <div className="mb-4">
            <Input
              type="file"
              label="Product Image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </div>

          <Button type="submit" color="black" className="w-full">
            Add Product
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default AddProduct;
