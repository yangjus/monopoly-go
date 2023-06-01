import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Link from "next/link";

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
            <div className="flex justify-between sm:justify-end w-full block flex-grow sm:flex sm:items-center sm:w-auto">
                <Link href="/" className="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4">
                    Home
                </Link>
                {!getCookie('session') && 
                <>
                    <Link href="/register" className="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4">
                        Register
                    </Link>
                    <Link href="/login" className="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white">
                        Login
                    </Link>
                </>}
                {getCookie('session') && 
                <>
                    <Link href="/trading" className="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4">
                        Trading
                    </Link>
                    <Link href="/profile" className="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-10">
                        Profile
                    </Link>
                    <form method="POST" action="/api/logout">
                        <button type="submit" className="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white">
                            Logout
                        </button>
                    </form>
                </>
                }
            </div>
        }
    </nav>
    )
}