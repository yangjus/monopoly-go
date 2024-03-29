import connect from "@component/../lib/mongodb";
import Conversation from "@component/../model/conversation_schema";
import Message from "@component/../model/message_schema";
import User from '@component/../model/user_schema';
import moment from 'moment';

connect()

export default async function createConversation(req: any, res: any) {
    try {
        //check if conversation is already created
        let convo = await Conversation.findOne({
            participants_email: {
              $all: [req.body.participants_email[0], req.body.participants_email[1]]
            }
        }).exec();
        if (!convo) {
            console.log("creating a new conversation")
            convo = await Conversation.create({participants_email: req.body.participants_email, hide: []});
            if (!convo) {
                return res.json({code:'Conversation not created'}).end()
            }
        }
        //then just submit the message into the chat
        let conversationId: string = convo._id.toString();
        await Conversation.findOneAndUpdate(
            { _id: convo._id }, 
            { $pullAll: { hide: [req.body.participants_email[0]] } }
        );
        
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

        //notify recipient if email_notification is true for them
        const recipient: any = await User.findOne({email: req.body.participants_email[1]}, 'username email_notification')

        res.end(JSON.stringify({
            response, 
            recipient_notification: recipient.email_notification,
            to_username: recipient.username
        }));
    } catch (error) {
        res.status(400).json({status: error})
    }
}
