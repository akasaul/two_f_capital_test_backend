import express from "express";
import cors from "cors";
import path from "path";
import authRouter from "./routes/api/auth.route";
import pizzaRouter from "./routes/api/pizza.route";
import roleRouter from "./routes/api/role.route";
import toppingRouter from "./routes/api/topping.route";
import orderRouter from "./routes/api/order.route";

import generalErrorHandler from "./middleware/errorHandling/generalErrorHandler";
import {
  authErrorHandler,
  prismaErrorHandler,
} from "./middleware/errorHandling";

const corsOptions = {
  origin: "*",
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", authRouter);
app.use("/api/pizzas", pizzaRouter);
app.use("/api/roles", roleRouter);
app.use("/api/toppings", toppingRouter);
app.use("/api/orders", orderRouter);

app.get("/", function (_req, res) {
  return res.send("Hello World!");
});

app.use(authErrorHandler, prismaErrorHandler, generalErrorHandler);

export default app;
