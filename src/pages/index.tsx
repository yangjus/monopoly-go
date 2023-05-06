import { GetServerSideProps } from "next";
import { useRouter } from 'next/router';
import jwt from "jsonwebtoken";
import Navbar from "@component/components/Navbar";

export default function Home({ user }: { user: any }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/register");
  }
  
  return (
    <>
    <Navbar isLogged={user ? true : false}/>
    <div className="items-center text-center justify-center h-screen space-y-4">
      <div className="text-4xl pt-20">Welcome to the MonopolyGO trading website!</div>
      <div className="text-2xl">Trading cards made easy</div>
      <button 
        onClick={handleClick}
        className="mx-auto bg-teal-500 hover:bg-teal-700 text-white text-2xl font-bold py-6 px-10 rounded">
        Get started now!
      </button>
    </div>
    </>
  )
}

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
