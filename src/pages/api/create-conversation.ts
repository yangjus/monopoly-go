import connect from "@component/../lib/mongodb";
import Conversation from "@component/../model/conversation_schema";
import Message from "@component/../model/message_schema";
import moment from 'moment';

connect()

export default async function createConversation(req: any, res: any) {
    try {
        //check if conversation is already created
        let convo = await Conversation.findOne({ participants_email: req.body.participants_email }).exec();
        if (!convo) {
            //console.log("creating a new conversation")
            convo = await Conversation.create({participants_email: req.body.participants_email});
            if (!convo) {
                return res.json({code:'Conversation not created'}).end()
            }
        }
        //then just submit the message into the chat
        //console.log(convo);
        const conversationId: string = convo._id.toString();
        const currentDate: moment.Moment = moment();

        const payload = {
            conversationId: conversationId,
            sender: req.body.sender,
            content: req.body.content,
            timestamp: currentDate
        }

        const response: any = await Message.create(payload)
        //console.log("response: ", response);
        if (!response) {
            res.status(400).json({status: 'message not created'})
        }

        res.end(JSON.stringify(response));
    } catch (error) {
        res.status(400).json({status: error}).end()
    }
}
