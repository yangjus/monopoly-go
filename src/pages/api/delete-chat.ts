import Conversation from "@component/../model/conversation_schema";
import { ObjectId } from 'mongodb';

export default async function deleteChat(req: any, res: any) {
    try {
        const convoId = new ObjectId(req.body.id);
        console.log(convoId);
        const response: any = await Conversation.findOneAndUpdate(
            {_id: convoId}, 
            { $addToSet: { hide: req.body.email } }
        ) //change this
        if (!response) res.status(400).json({status: 'Could not add to hide field in conversation.'})
        res.json({ conversation: response });
    } catch (error) {
        res.status(400).json({status: 'Could not add to hide field in conversation.'})
    }
};

//convo objects will have a new field: hide = String[] (default to empty [] when convo created)
//if in the array, user 1 has thier email in it, then the convo object will not be displayed on the front end

//if user 1 'deletes' convo, then the convo object will add their email to the hide[] field
//if user 1 has already deleted convo but remessages the respective user, then just remove their email from the hide[] field
