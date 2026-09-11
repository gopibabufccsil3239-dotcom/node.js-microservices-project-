import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    getProducts,
    createProduct
} from "../services/productApi.js";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (params = {}, thunkAPI) => {
        try {
            const response = await getProducts(params);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch products"
            );
        }
    }
);

export const addProduct = createAsyncThunk(
    "products/addProduct",
    async (productData, thunkAPI) => {
        try {
            const response = await createProduct(productData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to create product"
            );
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        pagination: {},
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data || action.payload;
                state.pagination = action.payload.pagination || {};
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default productSlice.reducer;