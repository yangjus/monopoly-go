import { GetServerSideProps } from "next";
import { useState, useEffect} from "react";
import jwt from "jsonwebtoken";
import Account from "@component/components/Account";
import Stickers from "@component/components/Stickers";
import { hasCookie, getCookie } from 'cookies-next';
import { stickers } from "../../constants/stickers";
import connect from "@component/../lib/mongodb";
import User from "@component/../model/schema";
import { UserType } from "../../constants/users";

export default function Profile({ user }: { user: any }) {

  console.log(user)

  const [noStickers, setNoStickers] = useState<boolean>(true);

  useEffect(() => {
    for (let i = 0; i < user.inventory.length; i++) {
      if (user.inventory[i] > 0) {
        setNoStickers(false);
        break;
      }
    }
  }, []);

  //add logic in Stickers such that if user just created account and has no inventory,
  //add a div line saying: New to the website? Update your inventory to start trading!

  return (
  <>
  <div className="items-center text-center justify-center space-y-4">
      <div className="text-4xl pt-10">Your Profile</div>
      {noStickers && 
        <div className="text-xl">
          New to the website? Update your inventory to start trading
        </div>
      }
      <div className="grid grid-cols-3 gap-4 px-10 py-5">
          <div className="col-span-1 rounded-md bg-teal-500 p-5">
              <Account user={user}/>
          </div>
          <div className="col-span-2 rounded-md bg-teal-500 p-5">
              <Stickers user={user} />
          </div>
      </div>
  </div>
  </>
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
  const decodedToken: any = jwt.verify(token, process.env.JWT_TOKEN);

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
    inventory: parsedObject.inventory
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
  