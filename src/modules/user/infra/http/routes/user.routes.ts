import Router from "express";
import UserController from "../controllers/UserController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const userController = new UserController();
const userRoute = Router();

userRoute.post("/", userController.regularSignUp);
userRoute.post("/band", userController.bandSignUp);
userRoute.post(
  "/admin",
  ensureAuthenticated({ admin: true }),
  userController.adminSignUp
);

userRoute.get(
  "/:role",
  ensureAuthenticated({ admin: true }),
  userController.listUsersByRole
);

export default userRoute;
