import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import {
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
  Typography,
} from "@material-tailwind/react";

const AddCategory = () => {
  const accessToken = Cookies.get("token"); // access token

  const [category, setCategory] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleImageChange = (e) => {
    setCategory({ ...category, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data = new FormData();
    data.append("name", category.name);
    data.append("description", category.description);
    data.append("image", category.image);

    try {
      let res = await axios.post(
        "http://localhost:5000/api/v1/category/create",
        data,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "multipart/formdata",
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
      }).then((result) => {
        if (result.isDismissed) {
          location.reload();
        }
      });
    }
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

export default AddCategory;
