import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

export default function Navbar() {

    const [isLogged, setLogged] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    
    const { push } = useRouter();

    const getSession = async() => {
        try {
            const session = await axios.get("/api/session");
            console.log("session data:", session);
            setLogged(true);

        } catch (error) {
            console.error(error); // log any errors that occur
            return;
        }
    }

    useEffect(() => {
        if (getCookie('session')) {
            setLogged(true);
        }
        setLoading(false);
    }, []);

    const Logout = async () => {
        try {
            await axios.post("/api/logout");
        } catch (error) {
            console.error(error); // log any errors that occur
            return;
        }
        console.log("cookie still exists after logout?", document.cookie);
        push("/login"); // bug where i logout from homepage but still same navbar
    }

    return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="font-semibold text-xl tracking-tight">MonopolyGO! Trading</span>
        </div>
        { !loading &&
        <div className="justify-end">
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <a href="/" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                    Home
                </a>
                {!getCookie('session') && 
                <>
                    <a href="/register" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Register
                    </a>
                    <a href="/login" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                        Login
                    </a>
                </>}
                {getCookie('session') && 
                <>
                    <a href="/trading" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Trading
                    </a>
                    <a href="/profile" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                        Profile
                    </a>
                    <form method="POST" action="/api/logout">
                        <button type="submit" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                            Logout
                        </button>
                    </form>
                </>
                }
            </div>
        </div> }
    </nav>
    )
}