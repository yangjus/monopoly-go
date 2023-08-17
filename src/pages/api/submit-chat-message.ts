import connect from "@component/../lib/mongodb";
import Message from "@component/../model/message_schema";
import User from '@component/../model/user_schema';
import Conversation from "../../../model/conversation_schema";
import moment from 'moment';
import { pusher } from "./global-chat";
import { ObjectId } from 'mongodb';

connect();

export default async function submitMessage(req: any, res: any) {
    try {
        const currentDate: moment.Moment = moment();
        //console.log("id: ", req.body.conversationId);
        const payload = {
            conversationId: req.body.conversationId,
            sender: req.body.sender,
            content: req.body.content,
            timestamp: currentDate
        }
        const response: any = await Message.create(payload)
        //console.log("response: ", response);
        if (!response) {
            res.status(400).json({status: 'message not created'})
        }
        //get recipient user's email based on conversationId
        const convoId = new ObjectId(req.body.conversationId);
        const conversation: any = await Conversation.findById(convoId);
        const recipient_email: string = conversation.participants_email[1];

        //notify recipient if email_notification is true for them
        const recipient: any = await User.findOne({email: recipient_email}, 'username email_notification')

        const pusher_response = await pusher.trigger("direct-chat", "message-event", {
            payload
        });

        return res.status(200).json({ 
            response, 
            pusher_response,  
            recipient_notification: recipient.email_notification,
            to_username: recipient.username,
            to_email: recipient_email
        });
    } catch (error) {
        res.status(400).json({status: 'message not created'})
    }
};