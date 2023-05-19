import connect from "@component/../lib/mongodb";
import User from "@component/../model/schema";
import jwt from "jsonwebtoken";
import { setCookie } from 'cookies-next';

connect()

export default async function login(req: any, res: any) {
    const {email, password}: {email: string, password: string} = req.body;
    const user: any = await User.findOne({email, password});
    const payload = {email: email};

    if (!user) {
        return res.status(404).json({error: "Unable to find user in database."})
    }
    else {
        const token = jwt.sign(payload, process.env.JWT_TOKEN);
        setCookie('session', token, { req, res, maxAge: 60 * 60 * 24 })
        res.status(200).json({ token });
    }
}
