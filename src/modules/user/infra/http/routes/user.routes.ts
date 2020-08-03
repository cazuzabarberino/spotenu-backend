import Router from "express";
import UserController from "../controllers/UserController";

const userController = new UserController();
const userRoute = Router();

userRoute.post("/", userController.regularSignUp);

export default userRoute;
