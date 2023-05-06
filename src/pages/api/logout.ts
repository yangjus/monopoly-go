import { withSessionRoute } from "@component/../lib/withSession";

export default withSessionRoute(
    function logoutRoute(req: any, res: any) {
      req.session.destroy();
      res.send({ ok: true });
      res.redirect("/");
    },
);