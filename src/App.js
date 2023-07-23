import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import ProductList from "./pages/productlist/ProductList";
import Single from "./pages/single/Single";
import NewProduct from "./pages/addnew/NewProduct";
import New from "./pages/new/New";
import EditProduct from "./pages/editProduct/EditProduct";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import OrderList from "./components/orderstable/OrderList";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const RequiredAuth = ({ children }) => {
    return currentUser ? (
      children
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/users" element={<RequiredAuth> <List /> </RequiredAuth>} />
          <Route path="/users/:userId" element={<RequiredAuth> <Single /> </RequiredAuth>} />
          <Route path="/users/new" element={<RequiredAuth> <New inputs={userInputs} title="Add New User" /> </RequiredAuth>} />

          <Route path="/products" element={<RequiredAuth> <ProductList /> </RequiredAuth>} />
          <Route path="/products/:productId" element={<RequiredAuth> <Single /> </RequiredAuth>} />
          <Route path="/products/newproduct" element={<RequiredAuth> <NewProduct title="Add New Product" /> </RequiredAuth>} />
          <Route path="/products/:productId/edit" element={<RequiredAuth> <EditProduct /> </RequiredAuth>} />

          <Route path="/orders" element={<RequiredAuth> <OrderList /> </RequiredAuth>} />
          <Route path="/orders/:orderId" element={<RequiredAuth> <Single /> </RequiredAuth>} />

          <Route path="/" element={<RequiredAuth> <Home /> </RequiredAuth>} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
