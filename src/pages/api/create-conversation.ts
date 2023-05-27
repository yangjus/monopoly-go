import connect from "@component/../lib/mongodb";
import Conversation from "@component/../model/conversation_schema";

connect()

export default async function createConversation(req: any, res: any) {
    try {
        const convo = await Conversation.create({participants_email: req.body.participants_email});
        if (!convo) {
            return res.json({code:'Conversation not created'}).end()
        }

        res.end(JSON.stringify(convo));
    } catch (error) {
        res.status(400).json({status: error}).end()
    }
}
