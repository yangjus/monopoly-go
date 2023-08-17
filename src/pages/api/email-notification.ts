import connect from "@component/../lib/mongodb";
import User from "@component/../model/user_schema";

connect()

export default async function handler(req: any, res: any) {
    try {
        User.findOneAndUpdate(
            { email: req.body.email },
            { $set: { email_notification: req.body.email_notification }},
            { new: true }
        ).then((updatedUser: any) => {
            if (!updatedUser) return res.json({code:'user object not updated'}).end()
            res.statusCode = 200;
            res.end(JSON.stringify(updatedUser));
        })
    } catch (error) {
        res.status(400).json({status: error})
    }
}
