import '@component/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head';
import Footer from '@component/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {

  return (
    <main className={inter.className}>
      <Head>
        <title>MonopolyGO! Trading</title>
      </Head>
      <div className="px-4 py-2">
        <Component {...pageProps} />
      </div>
      <Footer />
    </main>
  )
}
