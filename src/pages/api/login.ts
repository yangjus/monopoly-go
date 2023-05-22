import connect from "@component/../lib/mongodb";
import User from "@component/../model/user_schema";
import jwt from "jsonwebtoken";
import { setCookie } from 'cookies-next';
import moment from 'moment';
import Verify from "@component/../model/verify_schema";

connect()

export default async function login(req: any, res: any) {
    const {email, password}: {email: string, password: string} = req.body;
    try {
        const user: any = await User.findOne({email, password});
        if (!user) {
            return res.status(404).json({error: "Unable to find user in database."})
        }
        else {
            //check if email is verified
            const isVerified = await Verify.findOne({email: email});
            if (isVerified && isVerified.email_verified) {
                //update user's lastLogged to reflect current time
                const currentDate: moment.Moment = moment();
                await User.findOneAndUpdate(
                    { email: req.body.email },
                    { $set: { last_logged: currentDate }}
                );
    
                const token = jwt.sign({email: email}, process.env.JWT_TOKEN!);
                setCookie('session', token, { req, res, maxAge: 60 * 60 * 24 })
                res.status(200).json({ token });
            }
            else {
                return res.status(404).json({error: "User's email is not verified."})
            }
        }
    } catch (error) {
        res.status(400).json({status: error}).end()
    }
}
