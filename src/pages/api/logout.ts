import { deleteCookie } from 'cookies-next';

export default function logoutRoute(req: any, res: any) {

    deleteCookie('session', { req, res });
    res.redirect('/login');
};