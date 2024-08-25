import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();
//controller for sending a msg to user
export const sendMsg=async(req,res)=> {
    try {
    const {sender,reciever,content}=req.body;

    const message=await prisma.message.create({
        data: {
            sender,
            reciever,
            content
        }
    })
    res.json({
        message,
        msg:`message sent to user ${reciever}`
    }); 
    }
    catch(error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while sending the message' });
    }

}


//controller for checking all msgs of a user
export const getMsg=async(req,res)=> {
    try {
        const {user}=req.params;
        
        const msgs=await prisma.message.findMany({
            where: {
                OR: [
                    {sender:user},
                    {reciever:user}
                ]
            }
        });
        if(msgs.length===0) {
           return res.json({
                msg:"There are no messages for this user"
            })
        }
        res.json(msgs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while sending the message' });
    }
}