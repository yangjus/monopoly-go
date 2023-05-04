export default function Navbar() {
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
                <a href="/register" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                    Register
                </a>
                <a href="/login" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                    Login
                </a>
            </div>
        </div>
    </nav>
    )
}