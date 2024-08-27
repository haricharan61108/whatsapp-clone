import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();

export const createUser=async(req,res)=> {
    try {
        const {username}=req.body;

        const user=await prisma.user.create({
            data: {
                username
            }
        })
        res.json({
            user,
            msg:"user created succesfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
}