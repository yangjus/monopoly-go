import connect from "@component/../lib/mongodb";
import Verify from "@component/../model/verify_schema";

connect();

export default async function verifyEmail(req: any, res: any) {
    try {
        const response = await Verify.findOneAndUpdate(
            { email: req.body.email.toLowerCase(), code: req.body.code },
            { $set: { email_verified: true }},
            { new: true }
        )
            if (!response) return res.status(400)
            res.end(JSON.stringify(response));
    } catch (error) {
        res.status(400).json({status: 'email verification invalid'})
    }
};