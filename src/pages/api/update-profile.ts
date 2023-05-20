import connect from "@component/../lib/mongodb";
import User from "@component/../model/schema";

connect()

export default async function UpdateProfile(req: any, res: any) {
    try {
        User.findOneAndUpdate(
            { email: req.body.email },
            { $set: { 
                password: req.body.password,
                rank: req.body.rank,
                invite: req.body.invite,
                social: req.body.social
             }},
            { new: true }
        ).then((updatedUser: any) => {
            console.log(updatedUser);
            if (!updatedUser) return res.json({code:'user object not updated'}).end()
            return res.status(200).json({ updatedUser }).end();
        })
    } catch (error) {
        res.status(400).json({status: 'Cannot update user object.'})
    }
}
