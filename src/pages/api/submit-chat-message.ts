import connect from "@component/../lib/mongodb";
import Message from "@component/../model/message_schema";
import moment from 'moment';
import { pusher } from "./global-chat";

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

        const pusher_response = await pusher.trigger("direct-chat", "message-event", {
            payload
        });

        return res.status(200).json({ response, pusher_response });
    } catch (error) {
        res.status(400).json({status: 'message not created'})
    }
};