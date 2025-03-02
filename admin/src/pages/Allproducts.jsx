import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Typography, Button, Input } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useState } from "react";
import EditProductModal from "../components/EditProductModal";
import VerticalListSkeleton from "../components/common/VerticalListSkeleton";
import ProductLIstPagination from "../components/common/ProductLIstPagination";

const Allproducts = () => {
  const accessToken = Cookies.get("token"); // access token
  const products = useSelector((state) => state.products.products); // fetch all products
  const [loading, setLoading] = useState(false); // loading state
  const [isModalOpen, setIsModalOpen] = useState(false); // for modal state
  const [selectedProduct, setSelectedProduct] = useState(null); // set the target product

  // function for product delete
  const handleDelete = async (id) => {
    setLoading(true);
    console.log("Delete:", id);

    try {
      let res = await axios.delete(
        `http://localhost:5000/api/v1/product/delete/${id}`,
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

  // function for edit the product
  const handleEdit = async (product) => {
    setIsModalOpen(true);
    setSelectedProduct(product);
  };
  return (
    <section className=" w-full px-6">
      <div className=" py-5 rounded-none shadow-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray" className="font-hind">
              All Products
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button className="flex items-center gap-3" size="sm">
              <MagnifyingGlassIcon strokeWidth={2} className="h-4 w-4" /> Search
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-full">
        {products.length == 0 ? (
          <div className="w-full">
            <VerticalListSkeleton />
            <VerticalListSkeleton />
            <VerticalListSkeleton />
          </div>
        ) : (
          <table className="table-fixed w-full border-collapse border border-gray-300">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider">
                  Image
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                  Product Name
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider">
                  Description
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider">
                  Category
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                  Selling Price
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                  Discount Price
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider">
                  Featured
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider">
                  Hot Sell
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className=" w-full table-fixed">
              <ProductLIstPagination
                itemsPerPage={8}
                products={products}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            </tbody>
          </table>
        )}
      </div>

      <EditProductModal
        open={isModalOpen}
        product={selectedProduct}
        handleClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
export default Allproducts;
