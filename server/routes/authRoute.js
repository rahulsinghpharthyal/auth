// Packeages:-
import {Router} from "express";

// Controllers:-
import { googleAuth, logOut, signIn, signUp } from "../controllers/authController.js";
import { isVerifyFirebaseToken } from "../middlewares/isVerifyFirebaseToken.js";

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/google', isVerifyFirebaseToken, googleAuth);
router.post('/signout', logOut);

export default router;