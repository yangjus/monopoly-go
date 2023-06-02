import connect from "@component/../lib/mongodb";
import User from "@component/../model/user_schema";
import { hasCookie, deleteCookie } from "cookies-next";
import Verify from "@component/../model/verify_schema";

connect()

export default async function handler(req: any, res: any) {
    try {
        const payload = {
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            rank: Number(req.body.rank),
            invite: req.body.invite,
            social: req.body.social,
            trusted: req.body.trusted, 
            inventory: req.body.inventory, 
            last_logged: req.body.last_logged
        }
        const user = await User.create(payload);
        if (!user) {
            return res.json({code:'User not created'}).end()
        }

        const verify = await Verify.create({
            email: req.body.email,
            code: req.body.code,
            email_verified: false
        });
        if (!verify) {
            return res.json({code:'Verification object not created'}).end()
        }

        if (hasCookie('session', { req, res })) {
            deleteCookie('session', { req, res });
        }
        res.end(JSON.stringify(user));
    } catch (error) {
        res.status(400).json({status: error}).end()
    }
}
