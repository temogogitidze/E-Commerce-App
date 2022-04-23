import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home";
import SingleProduct from "./Pages/SingleProductPage";
import Cart from "./Pages/Cart";

function App() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/mycart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
