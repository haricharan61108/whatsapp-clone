import express from "express";
import { createUser } from "../controller/createUser.controller.js";

const router=express.Router();

router.post("/user",createUser)

export default router;

