import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const EditCategoryModal = ({ open, handleClose, category, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: category?.name || "",
    description: category?.description || "",
    image: null,
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        image: category.thumb || "",
      });
    }
  }, [category]);

  const [loading, setLoading] = useState(false);
  const accessToken = Cookies.get("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const res = await axios.patch(
        `http://localhost:5000/api/v1/category/update/${category._id}`,
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
      <DialogHeader>Edit Category</DialogHeader>
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
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Thumbnail Preview"
              className="w-24 h-24 object-cover rounded-md mx-auto"
            />
          )}
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

export default EditCategoryModal;
