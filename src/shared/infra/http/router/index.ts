import { Router } from "express";
import userRoute from "@modules/user/infra/http/routes/user.routes";

const router = Router();

router.use("/user", userRoute);

export default router;
