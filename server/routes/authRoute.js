// Packeages:-
import {Router} from "express";

// Controllers:-
import { signIn, signUp } from "../controllers/authController.js";

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);

export default router;