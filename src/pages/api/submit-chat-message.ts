import connect from "@component/../lib/mongodb";
import Message from "@component/../model/message_schema";
import moment from 'moment';

connect();

export default async function submitMessage(req: any, res: any) {
    try {
        const currentDate: moment.Moment = moment();
        //console.log("id: ", req.body.conversationId);
        const response: any = await Message.create({
            conversationId: req.body.conversationId,
            sender: req.body.sender,
            content: req.body.content,
            timestamp: currentDate
        })
        //console.log("response: ", response);
        if (!response) {
            res.status(400).json({status: 'message not created'})
        }

        return res.status(200).json({ response });
    } catch (error) {
        res.status(400).json({status: 'message not created'})
    }
};