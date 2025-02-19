import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticate.js';
import { updateUser, deleteUser } from '../controllers/userController.js';


const router = Router();

router.patch("/update/:id", isAuthenticated, updateUser);
router.delete("/delete/:id", isAuthenticated, deleteUser);

export default router;