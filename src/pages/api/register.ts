import connect from "@component/../lib/mongodb";
import User from "@component/../model/schema";
import { hasCookie, deleteCookie } from "cookies-next";

connect()

export default async function handler(req: any, res: any) {
    try {
        const user = await User.create(req.body);
        if (!user) {
            return res.json({code:'User not created'}).end()
        }
        if (hasCookie('session', { req, res })) {
            deleteCookie('session', { req, res });
        }
        res.end(JSON.stringify(user));
    } catch (error) {
        res.status(400).json({status: 'Cannot create a new user.'}).end()
    }
}
