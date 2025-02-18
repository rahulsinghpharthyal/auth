import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticate.js';
import { updateUser } from '../controllers/userController.js';


const router = Router();

router.post("/update/:id", isAuthenticated, updateUser);

export default router;