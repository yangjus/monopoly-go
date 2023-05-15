import { GetServerSideProps } from "next";
import jwt from "jsonwebtoken";
import Navbar from "@component/components/Navbar";
import Account from "@component/components/Account";
import Stickers from "@component/components/Stickers";

export default function Profile({ user }: { user: any }) {

    return (
    <>
    <Navbar isLogged={user ? true : false}/>
    <div className="items-center text-center justify-center space-y-4">
        <div className="text-4xl pt-10">Your Profile</div>
        <div className="grid grid-cols-3 gap-4 p-10">
            <div className="col-span-1 rounded-md bg-teal-500 p-5">
                <Account />
            </div>
            <div className="col-span-2 rounded-md bg-teal-500 p-5">
                <Stickers />
            </div>
        </div>
    </div>
    </>
    )
};

export const getServerSideProps: GetServerSideProps = async ({ req }: {req: any }) => {

    if (!req.headers.cookie) {
      return {
        // redirect: {
        //   destination: '/login',
        //   permanent: false
        // }
        props: {
          user: false
        }
      }
    }
  
    const token = req.headers.cookie.split(';').find((cookie: any) => cookie.trim().startsWith('token='))?.split('=')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  
    return {
      props: {
        user: decodedToken
      }
    }
  }
  