import { Router } from "express";
import { getTopRestaurants } from "../../controllers/restaurant.controller";

const router = Router();

router.get("/top", getTopRestaurants);

export default router;
