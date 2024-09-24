import express from "express";
import authRouter from "./routes/api/auth.route";
import pizzaRouter from "./routes/api/pizza.route";
import generalErrorHandler from "./middleware/errorHandling/generalErrorHandler";
import {
  authErrorHandler,
  prismaErrorHandler,
} from "./middleware/errorHandling";

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/pizzas", pizzaRouter);

app.get("/", function (_req, res) {
  return res.send("Hello World!");
});

app.use(authErrorHandler, prismaErrorHandler, generalErrorHandler);

export default app;
