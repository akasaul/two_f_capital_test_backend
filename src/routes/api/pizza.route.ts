import { Router } from "express";
import { authenticate } from "../../middleware/auth/authenticator.middleware";

const router = Router();

router.post("/", authenticate);

export default router;
