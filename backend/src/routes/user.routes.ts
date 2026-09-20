import {Router} from "express";
import { getAllUsers } from "../controllers/user.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { searchUsers } from "../controllers/user.controllers.js";
const router=Router();

router.get("/",authMiddleware,getAllUsers);
router.get("/search",authMiddleware,searchUsers);
export default router;