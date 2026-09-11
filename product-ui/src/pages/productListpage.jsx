import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice.js";

function ProductListPage() {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts({ page: 1, limit: 10 }));
    }, [dispatch]);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
        <main>
            <h1>Products</h1>

            {items.length === 0 ? (
                <p>No products found</p>
            ) : (
                <ul>
                    {items.map((product) => (
                        <li key={product.id}>
                            {product.name} - {product.price} - Stock: {product.stock}
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}

export default ProductListPage;