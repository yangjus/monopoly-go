import { GetServerSideProps } from "next";
import { useState, useEffect} from "react";
import jwt from "jsonwebtoken";
import Account from "@component/components/Account";
import Stickers from "@component/components/Stickers";
import { hasCookie, getCookie } from 'cookies-next';
import connect from "@component/../lib/mongodb";
import User from "@component/../model/user_schema";
import { UserType } from "../../constants/users";
import { Grid, IconButton, Collapse, Box } from "@mui/material";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

export default function Profile({ user }: { user: UserType }) {

  const [noStickers, setNoStickers] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

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

  useEffect(() => {
    for (let i = 0; i < user.inventory.length; i++) {
      if (user.inventory[i] > 0) {
        setNoStickers(false);
        break;
      }
    }
  }, [user.inventory]);

  return (
  <div className="items-center text-center justify-center space-y-4 min-h-screen">
      <div className="text-4xl pt-5">Your Profile</div>
      {noStickers && 
        <div className="text-xl">
          New to the website? Update your inventory to start trading
        </div>
      }
      {isMobile ? 
        (<Grid container>
          <Grid item xs={12}>
          <div className="bg-teal-500 mx-1 my-2 px-4 py-2 rounded-lg">
            <div className="text-2xl text-white flex justify-between items-center">
              <div className="ml-2">
                Account Info
              </div>
              <div>
                <IconButton
                  onClick={() => setOpen(!open)}
                >
                  {open ? <ArrowCircleUpIcon fontSize="large"/> : <ArrowCircleDownIcon fontSize="large"/>}
                </IconButton>
              </div>
            </div>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box className="m-1">
                  <Account user={user}/>
                </Box>
            </Collapse>
          </div>
          </Grid>
          <Grid item xs={12}>
          <div className="bg-teal-500 mx-1 my-2 p-4 rounded-lg">
            <Stickers user={user} isMobile={isMobile}/>
          </div>
          </Grid>
        </Grid>)
        : 
        (<div className="grid grid-cols-3 gap-4 px-10 py-5">
          <div className="col-span-1 rounded-md bg-teal-500 p-5">
            <div className="text-2xl text-white">Account Info</div>
            <Account user={user}/>
          </div>
          <div className="col-span-2 rounded-md bg-teal-500 p-5">
            <Stickers user={user} isMobile={isMobile}/>
          </div>
        </div>)
      }
  </div>
  )
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }: {req: any, res: any }) => {

  if (!hasCookie('session', { req, res })) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      },
    }
  }

  const token: any = getCookie('session', { req, res });
  const decodedToken: any = jwt.verify(token, process.env.JWT_TOKEN!);

  const userEmail: {email: string, iat: number} = {...decodedToken};

  connect();

  const userObject: any = await User.findOne({email: userEmail.email}).lean();
  const parsedObject: any = JSON.parse(JSON.stringify(userObject));

  const user: UserType = {
    email: parsedObject.email,
    password: parsedObject.password,
    username: parsedObject.username,
    rank: parsedObject.rank,
    invite: parsedObject.invite,
    social: parsedObject.social,
    trusted: parsedObject.trusted,
    inventory: parsedObject.inventory,
    email_notification: parsedObject.email_notification
  }

  if (user) {
    return {
      props: {
        user: user
      }
    }
  }

  //fallback
  //const initialArray = new Array(stickers.length).fill(0);
  return {
    props: {
      user: {}
    }
  }
}
  