
export default function logoutRoute(req: any, res: any) {
    res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly');
    res.send({ ok: true });
    res.redirect("/");
};