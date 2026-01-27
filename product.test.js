const { resetProducts, addProduct, removeProduct, getProducts, getProduct, updateProduct } = require("./product.js");

beforeEach(() => resetProducts());

describe("Adding Products", () => {
    it("should add product", () => {
        expect(() => addProduct("Tomato", 1.8)).not.toThrow();
        expect(() => getProducts().toEqual([{id: 0, name: "Tomato", price: 1.8}]));
    });
    it("should return error because of missing fields", () => {
        expect(() => addProduct("Tomato")).toThrow("name and price are required to create a product");
    });
    it("should return error because of price not a number", () => {
        expect(() => addProduct("Tomato", "1.8")).toThrow("price must be a number");
    });
    it("should return error because product already exists", () => {
        addProduct("Tomato", 1.8);
        expect(() => addProduct("Tomato", 2)).toThrow("product already exists");
    });
});

describe("Removing Products", () => {
    it("should delete product", () => {
        addProduct("Potato", 1.8);
        expect(() => removeProduct(1)).not.toThrow();
    });
    it("should return error because no value passed", () => {
        expect(() => removeProduct()).toThrow("id is required and must be a number");
    });
    it("should return error because id is not a number", () => {
        expect(() => removeProduct("1")).toThrow("id is required and must be a number");
    });
    it("should return error because id is not valid", () => {
        expect(() => removeProduct(2)).toThrow("id must be of a valid product");
    })
});

describe("Getting Products", () => {
    it("should get product", () => {
        addProduct("Carrot", 1.6);
        expect(getProduct(1)).toEqual({id: 1, name: "Carrot", price: 1.6});
    })
    it("should return error because no value passed", () => {
        expect(() => getProduct()).toThrow("id is required and must be a number");
    });
    it("should return error because id is not a number", () => {
        expect(() => getProduct("1")).toThrow("id is required and must be a number");
    });
    it("should return error because id is not valid", () => {
        expect(() => getProduct(2)).toThrow("id must be of a valid product");
    })
});

describe("Updating Products", () => {
    it("should update product", () => {
        addProduct("Apple", 1.6);
        expect(() => updateProduct(1, "Orange", 2.5)).not.toThrow();
    });
    it("should update product with just name", () => {
        addProduct("Apple", 1.6);
        expect(() => updateProduct(1, "Orange")).not.toThrow();
    });
    it("should update product with just price", () => {
        addProduct("Apple", 1.6);
        expect(() => updateProduct(1, null, 2.5)).not.toThrow();
    });
    it("should return error because no values passed", () => {
        expect(() => updateProduct()).toThrow("id is required and must be a number");
    });
    it("should return error because id is not a number", () => {
        expect(() => updateProduct("1", "Bread")).toThrow("id is required and must be a number");
    });
    it("should return error because id is not valid", () => {
        expect(() => updateProduct(2, "Bread")).toThrow("id must be of a valid product");
    });
    it("should return error because product already exists", () => {
        addProduct("Apple", 2.5);
        addProduct("Bread", 1.5);
        expect(() => updateProduct(2, "Bread")).toThrow("product already exists");
    });
    it("should return error because no name or price is passed", () => {
        addProduct("Apple", 2.5);
        expect(() => updateProduct(1)).toThrow("name and/or price are required to update a product");
    });
});
