import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Rootlayout from "./Layouts/Rootlayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Errorpage from "./pages/Errorpage";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
import DisplayProduct from "./pages/DisplayProduct";
import Shop from "./pages/Shop";
import ProtectedRoute from "./routes/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Rootlayout />}>
      <Route index element={<Home />} />
      <Route path="/product/:id" element={<DisplayProduct />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />
      <Route path="/*" element={<Errorpage />} />
    </Route>,
  ),
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
