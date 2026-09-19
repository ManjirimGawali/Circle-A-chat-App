import {Router} from "express";
import { getAllUsers } from "../controllers/user.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router=Router();

router.get("/",authMiddleware,getAllUsers);
export default router;