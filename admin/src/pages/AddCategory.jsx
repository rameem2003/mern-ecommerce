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

const AddCategory = () => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
    image: null,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleImageChange = (e) => {
    setCategory({ ...category, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(category); // Handle form submission logic
  };
  return (
    <Card className=" w-full mx-auto mt-8">
      <CardBody>
        <Typography variant="h5" className="text-gray-700 mb-6 font-hind">
          Add Category
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              label="Category Name"
              name="name"
              value={category.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <Textarea
              label="Category Description"
              name="description"
              value={category.description}
              onChange={handleInputChange}
              rows={4}
              required
            />
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

export default AddCategory;
