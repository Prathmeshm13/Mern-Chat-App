import express from "express";
import { getMessages, sendMessage } from "../Controllers/message.controller.js";
import { protectRoute } from "../middlewares/protectroute.js";
const router= express.Router();

router.get("/get/:id",protectRoute,getMessages);
router.post("/send/:id",protectRoute, sendMessage);

export default router;