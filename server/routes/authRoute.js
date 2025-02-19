// Packeages:-
import {Router} from "express";

// Controllers:-
import { googleAuth, logOut, signIn, signUp } from "../controllers/authController.js";

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/google', googleAuth);
router.post('/signout', logOut);

export default router;