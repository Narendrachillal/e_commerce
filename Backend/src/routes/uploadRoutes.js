import express from "express";
import upload from "../config/multer.js";
import { uploadImage } from "../controllers/uploadController.js";

const uploadRoutes = express.Router();

uploadRoutes.use("/images", express.static("upload/images"));
uploadRoutes.post("/upload", upload.single("product"), uploadImage);

export default uploadRoutes;
