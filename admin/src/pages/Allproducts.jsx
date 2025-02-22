import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useState } from "react";
import EditProductModal from "../components/EditProductModal";
import VerticalListSkeleton from "../components/common/VerticalListSkeleton";
import ProductLIstPagination from "../components/common/ProductLIstPagination";

const TABLE_HEAD = [
  "Image",
  "Product Name",
  "Description",
  "Category",
  "Selling Price",
  "Discount Price",
  "Stock",
  "Featured",
  "Hot Sell",
  "Action",
];

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
    <section className="">
      <Card className=" px-5 rounded-none shadow-none">
        <CardHeader floated={false} shadow={false} className="rounded-none">
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
                <MagnifyingGlassIcon strokeWidth={2} className="h-4 w-4" />{" "}
                Search
              </Button>
            </div>
          </div>
        </CardHeader>
        {products.length == 0 ? (
          <div className="w-full">
            <VerticalListSkeleton />
            <VerticalListSkeleton />
            <VerticalListSkeleton />
          </div>
        ) : (
          <CardBody className="overflow-hidden px-0">
            <table className="w-full table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* {products.map((p, index) => {
                  const isLast = index === products.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={p._id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={p.images[0]}
                            alt={p.name}
                            size="md"
                            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {p.name.slice(0, 10)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {p.description.slice(0, 10)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {p.category.name}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {p.sellingPrice} BDT
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {p.discountPrice} BDT
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {p.stock}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Edit Product">
                          <IconButton
                            onClick={() => handleEdit(p)}
                            variant="text"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete Product">
                          <IconButton
                            onClick={() => handleDelete(p._id)}
                            variant="text"
                          >
                            <TrashIcon className="h-4 w-4 text-red-500" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })} */}

                <ProductLIstPagination
                  itemsPerPage={6}
                  products={products}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              </tbody>
            </table>
          </CardBody>
        )}
      </Card>

      <EditProductModal
        open={isModalOpen}
        product={selectedProduct}
        handleClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
export default Allproducts;
