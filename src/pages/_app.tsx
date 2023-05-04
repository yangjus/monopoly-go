import '@component/styles/globals.css'
import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from "next/router";
import { Inter } from 'next/font/google'
import Head from 'next/head';
import Navbar from '@component/components/Navbar'
import Footer from '@component/components/Footer'
import Loading from '@component/components/Loading';

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const isLogged: boolean = false; //client side api to figure this out
    if ((router.pathname === "/trading" || router.pathname === "/profile") && !isLogged) {
      router.push('/login');
    }
    else if ((router.pathname === "/register" || router.pathname === "/login") && isLogged) {
      router.push('/');
    }
    else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className={inter.className}>
      <Head>
        <title>MonopolyGO! Trading</title>
      </Head>
      <Navbar />
      <div className="px-4 py-2">
        <Component {...pageProps} />
      </div>
      <Footer />
    </main>
  )
}
