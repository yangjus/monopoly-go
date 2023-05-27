import connect from "@component/../lib/mongodb";
import GlobalChat from "@component/../model/globalchat_schema";
import moment from 'moment';

connect();

export default async function getMessages(req: any, res: any) {
    try {
        const currentDate: moment.Moment = moment();
        const twoDaysLess: moment.Moment = moment(currentDate).subtract(2, 'days');
        const response: any[] = await GlobalChat.find({
            timestamp: {
                $gte: twoDaysLess
            }
        })
        if (!response) res.status(400).json({status: 'No global messages found.'})
        
        res.json({ conversations: response });
    } catch (error) {
        res.status(400).json({status: 'Cannot get messages.'})
    }
};