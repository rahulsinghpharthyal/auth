// Packeages:-
import { Router } from "express";

// Controllers:-
import getRefreshToken from "../controllers/refreshTokenController.js";

const router = Router();

router.get("/refresh-token", getRefreshToken);

export default router;
