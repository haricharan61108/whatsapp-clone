import express from "express";
import cors from "cors";
import  dotenv  from "dotenv";
import messageRoute from "./route/message.route.js"
import userRoute from "./route/user.route.js";

dotenv.config();
//installed npm i express body-parser axios cors dotenv nodemon prisma @prisma/client
const PORT=3000;
const app=express();
app.use(express.json());
app.use(cors());


//route for creating a user
app.use("/create",userRoute);
//route for sending and getting messages
app.use("/messages",messageRoute);

app.listen(PORT,()=> {
    console.log(`server is running on PORT ${PORT}`);
})
