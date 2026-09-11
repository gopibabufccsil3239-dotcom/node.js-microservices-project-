import axios from "axios";

const productApi = axios.create({
    baseURL: "http://localhost:5001"
});

export const getProducts = (params) => {
    return productApi.get("/products", { params });
};

export const createProduct = (productData) => {
    return productApi.post("/products", productData);
};

export const updateProduct = (id, productData) => {
    return productApi.put(`/products/${id}`, productData);
};

export const deleteProduct = (id) => {
    return productApi.delete(`/products/${id}`);
};