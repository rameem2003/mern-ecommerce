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
import OTPPage from "./pages/OTPPage";
import ViewByCategory from "./pages/ViewByCategory";
import PaymentSuccess from "./pages/PaymentSuccess";
import UsersAllOrders from "./pages/UsersAllOrders";
import PaymentFail from "./pages/PaymentFail";
import PaymentCancel from "./pages/PaymentCancel";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Rootlayout />}>
        <Route index element={<Home />} />
        <Route path="/product/:id" element={<DisplayProduct />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/category/:id" element={<ViewByCategory />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="/payment/success/:orderId" element={<PaymentSuccess />} />
        <Route path="/payment/fail/:orderId" element={<PaymentFail />} />
        <Route path="/payment/cancel/:orderId" element={<PaymentCancel />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account/orders"
          element={
            <ProtectedRoute>
              <UsersAllOrders />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<Errorpage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Route>
      <Route path="/verify-otp" element={<OTPPage />} />
    </Route>,
  ),
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
