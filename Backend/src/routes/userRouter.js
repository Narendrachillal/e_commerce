import express from "express";
import { userLogin, userRegister } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/signup", userRegister);
userRouter.post("/login", userLogin);

export default userRouter;
