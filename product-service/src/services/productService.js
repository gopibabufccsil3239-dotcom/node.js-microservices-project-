updateProduct: async (id, productData) => {
    const product = await productRepository.findById(id);

    if (!product) {
        throw new Error("Product not found");
    }

    // Validate product name
    if (
        productData.name !== undefined &&
        productData.name.trim() === ""
    ) {
        throw new Error("Product name cannot be empty");
    }

    // Validate price
    if (
        productData.price !== undefined &&
        (Number.isNaN(Number(productData.price)) ||
            Number(productData.price) < 0)
    ) {
        throw new Error("Product price must be zero or greater");
    }

    // Validate stock
    if (
        productData.stock !== undefined &&
        (Number.isNaN(Number(productData.stock)) ||
            Number(productData.stock) < 0)
    ) {
        throw new Error("Product stock must be zero or greater");
    }

    // Trim name before updating
    if (productData.name !== undefined) {
        productData.name = productData.name.trim();
    }

    return productRepository.update(id, productData);
},