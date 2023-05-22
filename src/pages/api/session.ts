import jwt from "jsonwebtoken";

export default async function session(req: any, res: any) {

    if (!req.headers.cookie) {
        return res.status(400).json({error: "Session not found."})
    }

    const token = req.headers.cookie
    .split(";")
    .find((cookie: any) => cookie.trim().startsWith("token="))?.split("=")[1];

    if (!token) {
        return res.status(400).json({ error: "Invalid session token." });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN!);
        res.status(200).json({ decodedToken });
    } catch (error) {
        return res.status(400).json({ error: "Invalid session token." });
    }
}