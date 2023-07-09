import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { Toolbar, IconButton, Menu, MenuItem, Divider } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

export default function Navbar() {

    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
        };
    
        handleResize(); // Check initial window size
        window.addEventListener('resize', handleResize); // Add event listener for window resize
    
        return () => {
          window.removeEventListener('resize', handleResize); // Clean up the event listener on component unmount
        };
    }, []);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  

    return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white">
            <span className="font-semibold text-xl tracking-tight">MonopolyGO Trading</span>
        </div>
        { isMobile &&
            <Toolbar className="p-0">
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClick}
                    sx={{ color: "white" }}
                    size="large"
                    className="m-0 p-0"
                >
                    <MenuIcon fontSize="inherit"/>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    keepMounted
                >
                    <MenuItem>
                        <Link href="/">
                            Home
                        </Link>
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    {!getCookie('session') && 
                        <>
                        <MenuItem>
                            <Link href="/register">
                                Register
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link href="/login">
                                Login
                            </Link>
                        </MenuItem>
                        </>
                    }
                    {getCookie('session') &&
                    <>
                        <MenuItem>
                            <Link href="/trading">
                                Trading
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link href="/profile">
                                Profile
                            </Link>
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem>
                            <form method="POST" action="/api/logout">
                                <button type="submit" className="block sm:inline-block hover:text-white">
                                    Logout
                                </button>
                            </form>
                        </MenuItem>
                    </>
                    }
                </Menu>
            </Toolbar>
        }
        { !isMobile &&
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