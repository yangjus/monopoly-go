import axios from "axios";

export default function Navbar({isLogged, user}: {isLogged: boolean, user: {email: string}}) {
    console.log(isLogged)
    console.log(user)

    const Logout = async () => {
        try {
            await axios.post("/api/logout");
        } catch (error) {
            console.error(error); // log any errors that occur
            return;
        }
    }

    return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="font-semibold text-xl tracking-tight">MonopolyGO! Trading</span>
        </div>
        <div className="justify-end">
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <a href="/" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                    Home
                </a>
                {!isLogged && 
                <>
                    <a href="/register" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Register
                    </a>
                    <a href="/login" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                        Login
                    </a>
                </>}
                {isLogged && 
                <>
                    <a href="/trading" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Trading
                    </a>
                    <a href="/profile" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                        Profile
                    </a>
                    <form onSubmit={Logout}>
                        <button type="submit" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                            Logout
                        </button>
                    </form>
                </>
                }
            </div>
        </div>
    </nav>
    )
}