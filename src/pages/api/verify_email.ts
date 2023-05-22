import connect from "@component/../lib/mongodb";
import Verify from "@component/../model/verify_schema";

connect();

export default async function verifyEmail(req: any, res: any) {
    try {
        console.log(req.body)
        Verify.findOneAndUpdate(
            { email: req.body.email, code: req.body.code },
            { $set: { email_verified: true }},
            { new: true }
        ).then((verifiedEmail: any) => {
            console.log(verifiedEmail);
            if (!verifiedEmail) return res.status(400)
            return res.status(200).json({ verifiedEmail })
        })
    } catch (error) {
        res.status(400).json({status: 'email verification invalid'})
    }
};