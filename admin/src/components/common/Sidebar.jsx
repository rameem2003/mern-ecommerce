import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  PowerIcon,
  TagIcon,
  ListBulletIcon,
  SquaresPlusIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { categoryReducer } from "../../redux/features/CategorySlice";
import { useEffect } from "react";
import { productReducer } from "../../redux/features/ProductSlice";
import { adminLogoutReducer } from "../../redux/features/AdminSlice";
import Cookies from "js-cookie";

const Sidebar = () => {
  const dispatch = useDispatch(); // dispatch instance

  // handleLogout
  const handleLogout = () => {
    dispatch(adminLogoutReducer());
    Cookies.remove("token");
    location.reload();
  };

  /**
   * Function for fetching all categories
   */
  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/api/v1/category/all");
    dispatch(categoryReducer(res.data.data));
  };

  /**
   * Function for fetching all products
   */
  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/v1/product/all");
    dispatch(productReducer(res.data.data));
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);
  return (
    <Card className="h-[calc(100vh-0rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography
          variant="h5"
          color="blue-gray"
          className="font-hind select-none"
        >
          MERN E-commerce
        </Typography>
      </div>
      <List>
        <Link to="/">
          <ListItem className="select-none">
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>
        <Link to="/addcategory">
          <ListItem className="select-none">
            <ListItemPrefix>
              <TagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Add Category
          </ListItem>
        </Link>
        <Link to="/allcategory">
          <ListItem className="select-none">
            <ListItemPrefix>
              <ListBulletIcon className="h-5 w-5" />
            </ListItemPrefix>
            All Categories
          </ListItem>
        </Link>
        <Link to="/addproduct">
          <ListItem className="select-none">
            <ListItemPrefix>
              <SquaresPlusIcon className="h-5 w-5" />
            </ListItemPrefix>
            Add Product
          </ListItem>
        </Link>
        <Link to="/allproducts">
          <ListItem className="select-none">
            <ListItemPrefix>
              <RectangleStackIcon className="h-5 w-5" />
            </ListItemPrefix>
            All Products
          </ListItem>
        </Link>
        <ListItem onClick={handleLogout} className="select-none">
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
};

export default Sidebar;
