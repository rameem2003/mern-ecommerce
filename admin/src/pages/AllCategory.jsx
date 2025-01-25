import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { IconButton, Typography } from "@material-tailwind/react";
import React from "react";

const AllCategory = () => {
  const categories = [
    {
      name: "Electronics",
      description: "Devices and gadgets.",
      products: 120,
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Clothing",
      description: "Trendy outfits.",
      products: 85,
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Books",
      description: "Knowledge and entertainment.",
      products: 200,
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Furniture",
      description: "Stylish furniture.",
      products: 45,
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Toys",
      description: "Fun for all ages.",
      products: 60,
      image: "https://via.placeholder.com/150",
    },
  ];

  const handleEdit = (category) => {
    console.log("Edit:", category);
    // Add edit logic here
  };

  const handleDelete = (category) => {
    console.log("Delete:", category);
    // Add delete logic here
  };
  return (
    <div className=" w-full mx-auto mt-8">
      <Typography
        variant="h4"
        className="text-gray-700 mb-6 text-center font-hind"
      >
        All Categories
      </Typography>
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
                    src={category.image}
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
                  {category.products}
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
                    onClick={() => handleDelete(category)}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCategory;
