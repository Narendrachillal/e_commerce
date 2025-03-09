import { Product } from "../models/Product.js";
import { User } from "../models/User.js";

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Add New Product
export const addProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    const id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

    const product = new Product({ id, ...req.body });
    await product.save();

    res
      .status(201)
      .json({ success: true, message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
};

// Remove Product
export const removeProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ id: req.body.id });
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing product", error });
  }
};

// New Collections

export const getNewCollections = async (req, res) => {
  try {
    const newCollections = await Product.find({})
      .sort({ createdAt: -1 }) // Fetch latest products first
      .limit(8); // Get only the last 8 products

    res.status(200).json(newCollections);
  } catch (error) {
    console.error("Error fetching new collections:", error);
    res.status(500).json({
      message: "Failed to fetch new collections",
      error: error.message,
    });
  }
};

//popular in womens
export const getpopularinwomen = async (req, res) => {
  try {
    let products = await Product.find({ category: "women" });
    let popular_in_women = products.slice(0, 4);
    res.send(popular_in_women);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch populars in women" });
  }
};

//add to cart
export const addToCart = async (req, res) => {
  try {
    let userData = await User.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );
    return res.json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Failed to add product to Cart" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    let userData = await User.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] -= 1;
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );
    return res.json({ message: "Product removed to cart successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Failed to remove product to Cart" });
  }
};
export const getCart = async (req, res) => {
  try {
    let userData = await User.findOne({ _id: req.user.id });
    res.json(userData.cartData);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Failed to get  products to Cart" });
  }
};
