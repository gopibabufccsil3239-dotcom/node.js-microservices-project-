import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../features/productSlice.js";

function AddProductPage() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.products);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        stock: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(
            addProduct({
                name: formData.name,
                price: Number(formData.price),
                stock: Number(formData.stock)
            })
        );

        setFormData({
            name: "",
            price: "",
            stock: ""
        });
    };

    return (
        <main>
            <h1>Add Product</h1>

            <form onSubmit={handleSubmit}>
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Product name" required />
                <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" min="0" required />
                <input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="Stock" min="0" required />

                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Add Product"}
                </button>
            </form>

            {error && <p>{error}</p>}
        </main>
    );
}

export default AddProductPage;