import '@component/styles/globals.css'
import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from "next/router";
import { Inter } from 'next/font/google'
import Head from 'next/head';
import Navbar from '@component/components/Navbar'
import Footer from '@component/components/Footer'
import Loading from '@component/components/Loading';
import { GetServerSideProps } from "next";
import jwt from "jsonwebtoken";

const inter = Inter({ subsets: ['latin'] })

type ServerSideProps = {
  isLogged: boolean,
  user: null | any
}

export default function App({ Component, pageProps, isLogged, user }: AppProps & ServerSideProps) {
  //const router = useRouter();
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const isLogged: boolean = false; //client side api to figure this out
  //   if ((router.pathname === "/trading" || router.pathname === "/profile") && !isLogged) {
  //     router.push('/login');
  //   }
  //   else if ((router.pathname === "/register" || router.pathname === "/login") && isLogged) {
  //     router.push('/');
  //   }
  //   else {
  //     setIsLoading(false);
  //   }
  // }, [router]);

  // if (isLoading) {
  //   return <Loading />;
  // }
  console.log(isLogged)
  console.log(user)

  return (
    <main className={inter.className}>
      <Head>
        <title>MonopolyGO! Trading</title>
      </Head>
      <Navbar isLogged={isLogged} user={user}/>
      <div className="px-4 py-2">
        <Component {...pageProps} />
      </div>
      <Footer />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }: {req: any }) => {

  if (!req.headers.cookie) { //if user is not logged in
    return {
      props: {
        isLogged: false,
        user: null,
      }
    };
  }

  console.log(req.headers.cookie)
  const token = req.headers.cookie.split(';').find((cookie: any) => cookie.trim().startsWith('token='))?.split('=')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);

  return {
    props: {
      isLogged: true,
      user: decodedToken,
    },
  };
}
