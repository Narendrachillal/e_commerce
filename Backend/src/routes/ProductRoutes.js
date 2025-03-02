import express from "express";
import {
  getAllProducts,
  addProduct,
  removeProduct,
  getNewCollections,
  getpopularinwomen,
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/productController.js";
import { fetchUser } from "../middleware/Auth.middleware.js";

const productRoutes = express.Router();
//routes for admin panel
productRoutes.get("/allproducts", getAllProducts);
productRoutes.post("/addproduct", addProduct);
productRoutes.post("/removeproduct", removeProduct);

//shop page data
productRoutes.get("/newcollections", getNewCollections);
productRoutes.get("/popularinwomen", getpopularinwomen);

//add to cart
productRoutes.post("/addtocart", fetchUser, addToCart);
productRoutes.post("/removefromcart", fetchUser, removeFromCart);
productRoutes.post("/getcart", fetchUser, getCart);

export default productRoutes;
