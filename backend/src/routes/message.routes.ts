import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";

import {
    getMessages,
    sendMessage
} from "../controllers/message.controller.js";


const router = Router();


router.get(
    "/:conversationId",
    authMiddleware,
    getMessages
);

router.post(
    "/",
    authMiddleware,
    sendMessage
);

export default router;