import {Router} from "express";
 import { createPrivateConversation, getMyConversations } from "../controllers/conversation.controller.js";
 import { authMiddleware } from "../middleware/auth.middleware.js";

 const router=Router();
 router.post("/private",authMiddleware, createPrivateConversation);
 router.get("/",authMiddleware,getMyConversations)
 export default router;