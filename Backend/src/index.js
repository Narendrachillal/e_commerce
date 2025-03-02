// import express from "express";
// import cors from "cors";
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";
// import multer from "multer";
// import path from "path";
// const app = express();

// const port = 4000;
// app.use(express.json());
// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
// mongoose.connect("mongodb://localhost:27017/e_commerce");

// app.get("/", (req, res) => {
//   res.send("Express app is runnig");
// });

// //Image  storage engine

// const storage = multer.diskStorage({
//   destination: "./upload/images",
//   filename: (req, file, cb) => {
//     return cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// const upload = multer({ storage: storage });

// // Creating uplaod  endpoint for images

// app.use("/images", express.static("upload/images"));

// app.post("/upload", upload.single("product"), (req, res) => {
//   res.json({
//     success: 1,
//     image_url: `http://localhost:${port}/images/${req.file.filename}`,
//   });
// });

// //schema for creating products

// const Product = mongoose.model("Product", {
//   id: {
//     type: Number,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     // required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   new_price: {
//     type: Number,
//     required: true,
//   },
//   old_price: {
//     type: Number,
//     required: true,
//   },
//   Date: {
//     type: Date,
//     default: Date.now,
//   },
//   available: {
//     type: Boolean,
//     default: true,
//   },
// });

// app.post("/addproduct", async (req, res) => {
//   let products = await Product.find({});
//   let id;
//   if (products.length > 0) {
//     let last_product_array = products.slice(-1);
//     let last_product = last_product_array[0];
//     id = last_product.id + 1;
//   } else {
//     id = 1;
//   }
//   const product = new Product({
//     id: id,
//     name: req.body.name,
//     image: req.body.image,
//     category: req.body.category,
//     new_price: req.body.new_price,
//     old_price: req.body.old_price,
//   });
//   console.log(product);
//   await product.save();
//   console.log("saved");
//   res.json({ success: true, name: req.body.name });
// });

// app.post("/removeproduct", async (req, res) => {
//   await Product.findOneAndDelete({
//     id: req.body.id,
//   });
//   console.log("removed");
//   res.json({ success: true, name: req.body.name });
// });

// app.get("/allproducts", async (req, res) => {
//   let products = await Product.find({});
//   console.log("All products fetched");
//   res.send(products);
// });
// app.listen(port, () => {
//   console.log("Server is runnig on port " + port);
// });

import app from "./app.js";

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
