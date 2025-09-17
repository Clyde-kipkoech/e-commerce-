import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./Pages/Product";
import AddProduct from "./Pages/AddProduct";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";

function App() {
  return (
     <Router>
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
