import connect from "@component/../lib/mongodb";
import User from "@component/../model/user_schema";

connect();

export default async function updateInventory(req: any, res: any) {
    try {
        //console.log(req.body)
        User.findOneAndUpdate(
            { email: req.body.email },
            { $set: { inventory: req.body.inventory }},
            { new: true }
        ).then((updatedUser: any) => {
            //console.log(updatedUser);
            if (!updatedUser) return res.json({code:'user object not updated'}).end()
            return res.status(200).json({ updatedUser });
        })
    } catch (error) {
        res.status(400).json({status: 'Cannot update user object.'})
    }
};