import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Account from "@component/components/Account";
import Stickers from "@component/components/Stickers";
import { hasCookie, getCookie } from 'cookies-next';

export default function Profile({ user }: { user: any }) {

  console.log(user)

  return (
  <>
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

    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  
    return {
      props: {
        user: decodedToken
      }
    }
  }
  