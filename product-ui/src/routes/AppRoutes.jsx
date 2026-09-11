import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ProductListPage from "../pages/ProductListPage";
import AddProductPage from "../pages/AddProductPage";

function AppRoutes() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/products">Products</Link>{" "}
                <Link to="/add-product">Add Product</Link>
            </nav>

            <Routes>
                <Route path="/products" element={<ProductListPage />} />
                <Route path="/add-product" element={<AddProductPage />} />
                <Route path="*" element={<ProductListPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;