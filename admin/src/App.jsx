import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Rootlayout from "./layouts/Rootlayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProduct from "./pages/AddProduct";
import Allproducts from "./pages/Allproducts";
import AddCategory from "./pages/AddCategory";
import AllCategory from "./pages/AllCategory";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Rootlayout />}>
          <Route index element={<Home />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/allcategory" element={<AllCategory />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/allproducts" element={<Allproducts />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
