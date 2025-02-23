import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const EditProductModal = ({ open, handleClose, product, onUpdate }) => {
  const categories = useSelector((state) => state.category.categories); // fetch all categories

  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    sellingPrice: product?.sellingPrice || "",
    discountPrice: product?.discountPrice || "",
    stock: product?.stock || "",
    // category: product?.category || "",
    images: null,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        sellingPrice: product.sellingPrice || "",
        discountPrice: product.discountPrice || "",
        stock: product.stock || "",
        // category: product.category || "",
        images: product.images,
      });
    }
  }, [product]);

  const [loading, setLoading] = useState(false);
  const accessToken = Cookies.get("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("sellingPrice", formData.sellingPrice);
      formDataToSend.append("discountPrice", formData.discountPrice);
      formDataToSend.append("stock", formData.stock);
      //   formDataToSend.append("category", formData.category);
      if (formData.images) {
        for (let i = 0; i < formData.images.length; i++) {
          formDataToSend.append("images", formData.images[i]);
        }
      }

      const res = await axios.patch(
        `http://localhost:5000/api/v1/product/update/${product._id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Cookie: `token=${accessToken}`,
          },
          withCredentials: true,
        }
      );

      Swal.fire({
        title: res.data.msg,
        confirmButtonText: "Ok",
        confirmButtonColor: "green",
        icon: "success",
      });
      onUpdate(); // Refresh the category list
      handleClose();
    } catch (error) {
      console.log(error);
      handleClose();
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} handler={handleClose} size="md">
      <DialogHeader>Edit Product</DialogHeader>
      <DialogBody>
        <div className="space-y-4">
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <Input
            label="Selling Price"
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={handleChange}
          />
          <Input
            label="Discount Price"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleChange}
          />
          <Input
            label="Stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />

          {/* <div>
            <Select
              label="Product Category"
              name="category"
              value={formData.category}
              onChange={(value) =>
                setFormData({ ...formData, category: value })
              }
              required
            >
              {categories.map((cat, index) => (
                <Option key={index} value={cat._id}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </div> */}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {/* {formData.image && (
            <img
              src={formData.image}
              alt="Thumbnail Preview"
              className="w-24 h-24 object-cover rounded-md mx-auto"
            />
          )} */}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          color="gray"
          variant="text"
          onClick={handleClose}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button color="blue" onClick={handleSubmit} loading={loading}>
          Save Changes
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditProductModal;
