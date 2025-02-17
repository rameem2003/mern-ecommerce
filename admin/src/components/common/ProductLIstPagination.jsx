import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Flex from "./Flex";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const ProductLIstPagination = ({
  itemsPerPage,
  products,
  handleDelete,
  handleEdit,
}) => {
  const [loading, setLoading] = useState(false);
  const accessToken = Cookies.get("token");
  const items = products;

  function Items({ currentItems }) {
    // function for product feature update
    const handleFeaturedUpdate = async (e, id) => {
      setLoading(true);
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("featured", e.target.checked);

        const res = await axios.patch(
          `http://localhost:5000/api/v1/product/update/${id}`,
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
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
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
      } finally {
        setLoading(false);
      }
    };

    // function for product hotSell update
    const handleHotSellUpdate = async (e, id) => {
      setLoading(true);
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("hotSell", e.target.checked);

        const res = await axios.patch(
          `http://localhost:5000/api/v1/product/update/${id}`,
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
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
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
      } finally {
        setLoading(false);
      }
    };
    return (
      <>
        {currentItems &&
          currentItems.map((p, index) => {
            const isLast = index === products.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

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
                  <div className="w-max">
                    <input
                      type="checkbox"
                      onChange={(e) => handleFeaturedUpdate(e, p._id)}
                      checked={p.featured}
                      // defaultValue={p.featured}
                      className=" size-5"
                      name=""
                      id=""
                    />
                  </div>
                </td>
                <td className={classes}>
                  <div className="w-max">
                    <input
                      type="checkbox"
                      checked={p.hotSell}
                      onChange={(e) => handleHotSellUpdate(e, p._id)}
                      className=" size-5"
                      name=""
                      id=""
                    />
                  </div>
                </td>
                <td className={classes}>
                  <Tooltip content="Edit Product">
                    <IconButton onClick={() => handleEdit(p)} variant="text">
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
          })}
      </>
    );
  }

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <Flex className=" flex-col items-center justify-between gap-5 lg:mb-[140px] lg:mt-[50px] lg:flex-row lg:gap-0">
        <ReactPaginate
          breakLabel="..."
          className="ml-[-15px] flex gap-4"
          activeClassName="bg-black text-white"
          pageClassName=" p-5 border-[1px] border-[#F0F0F0] font-dm font-normal text-[14px] text-secondary"
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel=""
          renderOnZeroPageCount={null}
        />
        <p className="font-dm text-secondary text-[14px] font-normal leading-[30px]">
          Products from {itemOffset} to {endOffset} of {items.length}
        </p>
      </Flex>
    </>
  );
};

export default ProductLIstPagination;
