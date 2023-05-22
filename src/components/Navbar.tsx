import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

export default function Navbar() {

    const [isLogged, setLogged] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    
    const { push } = useRouter();

    useEffect(() => {
        if (getCookie('session')) {
            setLogged(true);
        }
        setLoading(false);
    }, []);

    return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="font-semibold text-xl tracking-tight">MonopolyGO Trading</span>
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
                    <a href="/profile" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-10">
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