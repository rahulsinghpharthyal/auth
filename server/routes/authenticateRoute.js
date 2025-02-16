// Packeages:-
import {Router} from "express";

// Controllers:-
import { signIn, signUp } from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/isAuthenticate.js";
import authenticate from "../controllers/authenticateController.js";

const router = Router();

router.get('/authenticate', isAuthenticated, authenticate);

export default router;