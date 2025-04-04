import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { IconButton, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import EditCategoryModal from "../components/EditCategoryModal";
import VerticalListSkeleton from "../components/common/VerticalListSkeleton";

const AllCategory = () => {
  const accessToken = Cookies.get("token"); // access token
  const categories = useSelector((state) => state.category.categories); // fetch all categories
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // for modal state
  const [selectedCategory, setSelectedCategory] = useState(null); // set the target category

  // handle edit
  const handleEdit = (category) => {
    console.log("Edit:", category);
    // Add edit logic here
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  // handle update
  const handleDelete = async (id) => {
    setLoading(true);
    console.log("Delete:", id);

    try {
      let res = await axios.delete(
        `http://localhost:5000/api/v1/category/delete/${id}`,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: `token=${accessToken}`,
          },
        }
      );

      Swal.fire({
        title: res.data.msg,
        confirmButtonText: "Ok",
        confirmButtonColor: "green",
        icon: "success",
      });
      setLoading(false);

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

  // on update
  const handleUpdate = () => {
    // Fetch updated category list logic
    setIsModalOpen(false);
  };
  return (
    <div className=" w-full mx-auto mt-8">
      <Typography
        variant="h4"
        className="text-gray-700 mb-6 text-center font-hind"
      >
        All Categories
      </Typography>

      {categories.length == 0 ? (
        <div className="w-full">
          <VerticalListSkeleton />
          <VerticalListSkeleton />
          <VerticalListSkeleton />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-blue-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">
                  Image
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center text-gray-700">
                  Products
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={category.thumb}
                      alt={category.name}
                      className="h-12 w-12 object-cover rounded-full"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {category.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {category.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {category.products.length}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <IconButton
                      variant="text"
                      color="blue"
                      className="mr-2"
                      onClick={() => handleEdit(category)}
                    >
                      <PencilIcon className="h-5 w-5" />
                    </IconButton>
                    <IconButton
                      variant="text"
                      color="red"
                      onClick={() => handleDelete(category._id)}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <EditCategoryModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        category={selectedCategory}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default AllCategory;
