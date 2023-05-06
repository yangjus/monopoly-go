import { GetServerSideProps } from "next";
import { useRouter } from 'next/router';
import { getSession } from "next-auth/react";

export default function Home({ session }: { session: any }) {
  const router = useRouter();
  console.log(session);
  const handleClick = () => {
    router.push("/register");
  }

  return (
    <div className="items-center text-center justify-center h-screen space-y-4">
      <div className="text-4xl pt-20">Welcome to the MonopolyGO trading website!</div>
      <div className="text-2xl">Trading cards made easy</div>
      <button 
        onClick={handleClick}
        className="mx-auto bg-teal-500 hover:bg-teal-700 text-white text-2xl font-bold py-6 px-10 rounded">
        Get started now!
      </button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {

  const session = await getSession(context);
  console.log(session)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}
