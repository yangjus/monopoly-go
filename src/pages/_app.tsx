import '@component/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head';
import Footer from '@component/components/Footer'
import Navbar from '@component/components/Navbar';
import NextNProgress from 'nextjs-progressbar';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <main className={inter.className}>
      <Head>
        <title>MonopolyGO! Trading</title>
      </Head>
      <NextNProgress />
      <Navbar />
      <div className={`${isHomePage ? 'py-0 px-0' : 'py-2 px-4'}`}>
        <Component {...pageProps} />
      </div>
      <div className="bottom-0">
        <Footer />
      </div>
    </main>
  )
}
