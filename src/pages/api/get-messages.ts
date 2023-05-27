import connect from "@component/../lib/mongodb";
import Message from "@component/../model/message_schema";
import User from "@component/../model/user_schema";

connect();

export interface sentMessage {
    sender: string,
    content: string,
    timestamp: Date
}

export interface Chat {
    conversationId: string,
    recipient_email: string,
    recipient_username: string,
    user_email: string,
    messages: sentMessage[]
}

export default async function getMessages(req: any, res: any) {
    try {
        const response: Chat[] = await Promise.all(req.body.conversations.map(async (chat: any) => {
            const conversationId: string = chat._id;
            const recipient_email: string = 
                chat.participants_email[0] === req.body.user_email ? chat.participants_email[1] : chat.participants_email[0];
            const recipient_username: string | null = (await User.findOne({email: recipient_email}, 'username')).username;
            if (!recipient_username) res.status(400).json({status: 'Did not find recipient with recipient email.'});
            const user_email: string = req.body.user_email;
            const query: string = 'sender content timestamp'
            const messages: sentMessage[] = await Message.find({ conversationId: chat._id }, query).exec();
            return { conversationId, recipient_email, recipient_username, user_email, messages };
        }))
        //console.log("input: ", response);

        res.json({ conversations: response });
    } catch (error) {
        res.status(400).json({status: 'Cannot get messages.'})
    }
};