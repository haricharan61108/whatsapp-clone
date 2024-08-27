import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();
//controller for sending a msg to user
export const sendMsg=async(req,res)=> {
    try {
      const {senderUsername,recieverUsername,content}=req.body;
      
      const sender=await prisma.user.findUnique({
        where: {
            username:senderUsername
        }
      })
      const reciever=await prisma.user.findUnique({
        where: {
            username:recieverUsername
        }
      })

      if(!sender || !reciever) {
        return res.status(404).json({error:"Sender or reciever not found"});
      }

      const message=await prisma.message.create({
        data: {
            content,
            senderId:sender.id,
            recieverId:reciever.id
        }
      })
      res.json(`user ${sender.username} has sent a msg ${message} to user ${reciever.username}`);
    }
    catch(error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while sending the message' });
    }

}


//controller for checking all msgs of a user
export const getMsg=async(req,res)=> {
    try {
       const {username}=req.params;

       const user=await prisma.user.findUnique({
        where: {username}
       });

       if(!user) {
        return res.status(404).json({error:"User doesnt exist"});
       }

       const messages=await prisma.message.findMany({
        where: {
            recieverId:user.id
        },
        include: {
            sender:true
        }
       })
       if(messages.length===0) {
       return res.json({msg:"this user didnot recieve any messages"});
       }

       res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while getting the messages' });
    }
}