import express from "express";
import cors from "cors";
import  dotenv  from "dotenv";
import messageRoute from "./route/message.route.js"
import userRoute from "./route/user.route.js";
import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();

dotenv.config();
//installed npm i express body-parser axios cors dotenv nodemon prisma @prisma/client
const PORT=3000;
const app=express();
app.use(express.json());
app.use(cors());


//for logging in
app.get("/users/:username",async(req,res)=> {
    try {
        const {username}=req.params;
        const user=await prisma.user.findUnique({
            where:{username}
        })
        if(!user) {
            return res.status(404).json({error:"User not found"});
        }

        res.json(user);
    } catch (error) {
        
    }
})
//route for creating a user
app.use("/create",userRoute);
//route for sending and getting messages
app.use("/messages",messageRoute);

app.listen(PORT,()=> {
    console.log(`server is running on PORT ${PORT}`);
})
