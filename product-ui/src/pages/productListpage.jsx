import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice.js";

function ProductListPage() {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.products);
    const [searchTerm, setSearchTerm] = useState("");
    const [maximumPrice, setMaximumPrice] = useState("");

    useEffect(() => {
        dispatch(fetchProducts({ page: 1, limit: 10 }));
    }, [dispatch]);

    const filteredProducts = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase();
        const priceLimit = maximumPrice === "" ? Infinity : Number(maximumPrice);

        return items.filter((product) => {
            const matchesName = product.name.toLowerCase().includes(normalizedSearch);
            const matchesPrice = Number(product.price) <= priceLimit;

            return matchesName && matchesPrice;
        });
    }, [items, maximumPrice, searchTerm]);

    return (
        <main>
            <h1>Products</h1>

            <section>
                <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search by product name"
                    aria-label="Search by product name"
                />
                <input
                    type="number"
                    min="0"
                    value={maximumPrice}
                    onChange={(event) => setMaximumPrice(event.target.value)}
                    placeholder="Maximum price"
                    aria-label="Maximum price"
                />
            </section>

            {loading && <p>Loading products...</p>}
            {error && <p role="alert">{error}</p>}

            {!loading && !error && filteredProducts.length === 0 ? (
                <p>No matching products found</p>
            ) : (
                <ul>
                    {filteredProducts.map((product) => (
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