import '@component/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head';
import Footer from '@component/components/Footer'
import Navbar from '@component/components/Navbar';
import NextNProgress from 'nextjs-progressbar';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <main className={inter.className}>
      <Head>
        <title>MonopolyGO! Trading</title>
      </Head>
      <NextNProgress />
      <Navbar />
      {isMobile ? (
        <div className="mobile-screen text-2xl m-6 h-screen">
          This page is not available on mobile and other small screen devices.
          Stay tuned for a mobile-responsive update!
        </div>
      ) : (
        <>
          <div className="px-4 py-2">
            <Component {...pageProps} />
          </div>
        </>
      )}
      <div className="bottom-0">
        <Footer />
      </div>
    </main>
  )
}
