import express from "express";
import { getMsg, sendMsg } from "../controller/messages.controller.js";

const router=express.Router();

//route for sending msg
router.post("/send",sendMsg)

//route for checking all msgs
router.get("/:username",getMsg)

export default router;