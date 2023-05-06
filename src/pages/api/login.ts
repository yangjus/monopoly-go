import connect from "@component/../lib/mongodb";
import User from "@component/../model/schema";
import { withSessionRoute } from "@component/../lib/withSession";

connect()

export default withSessionRoute(
    async function handler(req: any, res: any) {
    
        const {email, password}: {email: string, password: string} = req.body;
        const user: any = await User.findOne({email, password});
    
        if (!user) {
            return res.status(404).json({error: "Unable to find user in database."})
        }
        else {
            req.session.user = {
                email: email
            }
            await req.session.save();
            res.status(200).end();
        }
    }
);
