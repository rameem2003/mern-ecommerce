import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  TagIcon,
  ListBulletIcon,
  SquaresPlusIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";

const Sidebar = () => {
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
        <ListItem className="select-none">
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem className="select-none">
          <ListItemPrefix>
            <TagIcon className="h-5 w-5" />
          </ListItemPrefix>
          Add Category
        </ListItem>
        <ListItem className="select-none">
          <ListItemPrefix>
            <ListBulletIcon className="h-5 w-5" />
          </ListItemPrefix>
          All Categories
        </ListItem>
        <ListItem className="select-none">
          <ListItemPrefix>
            <SquaresPlusIcon className="h-5 w-5" />
          </ListItemPrefix>
          Add Product
        </ListItem>
        <ListItem className="select-none">
          <ListItemPrefix>
            <RectangleStackIcon className="h-5 w-5" />
          </ListItemPrefix>
          All Products
        </ListItem>
        <ListItem className="select-none">
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
