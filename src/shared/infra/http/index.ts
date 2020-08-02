import express from "express";
import router from "./router";
import errorCatcher from "./middlewares/errorCatcher";

const app = express();

app.use(express.json());

app.use(router);

app.use(errorCatcher);

export default app;
