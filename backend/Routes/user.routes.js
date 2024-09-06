import express from "express"
import { protectRoute } from "../middlewares/protectroute.js";
import { getUsersforSideBar } from "../Controllers/user.controller.js";
const router=express.Router();

router.get("/",protectRoute,getUsersforSideBar);

export default router;