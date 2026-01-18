let products = [];
let id = 0;

function isNumber(a) {
    return typeof a === "number";
}

function resetProducts() {
    products = [];
    id = 1;
}

function addProduct(name, price) {
    if (!name || !price) {
        throw new Error("name and price are required to create a product");
    }
    if (!isNumber(price)) {
        throw new Error("price must be a number");
    }
    const product = products.find((product) => product.name === name);
    if (product) {
        throw new Error("product already exists");
    }
    const newProduct = {
        id: id,
        name: name,
        price: price,
    };
    products.push(newProduct);
    id++;
}

function removeProduct(id) {
    if (id === null || !isNumber(id)) {
        throw new Error("id is required and must be a number");
    }
    const productIndex = products.findIndex((product) => product.id == id);
    if (productIndex == -1) {
        throw new Error("id must be of a valid product");
    }
    products.splice(productIndex, 1);
}

function getProducts() {
    return products;
}

function getProduct(id) {
    if (!id || !isNumber(id)) {
        throw new Error("id is required and must be a number");
    }
    const product = products.find((product) => product.id === id);
    if (!product) {
        throw new Error("id must be of a valid product");
    }
    return product;
}

function updateProduct(id, name = null, price = null) {
    if (!id || !isNumber(id)) {
        throw new Error("id is required and must be a number");
    }
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
        throw new Error("id must be of a valid product");
    }
    if (!name && !price) {
        throw new Error("name and/or price are required to update a product");
    }
    if (price && !isNumber(price)) {
        throw new Error("price must be a number");
    }
    if (name) {
        const product = products.find((product) => product.name === name);
        if (product) {
            throw new Error("product already exists");
        }
        products[productIndex].name = name;
    }
    if (price) {
        products[productIndex].price = price;
    }
}

module.exports = {
    resetProducts,
    addProduct,
    removeProduct,
    getProducts,
    getProduct,
    updateProduct,
};