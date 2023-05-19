import { GetServerSideProps } from "next";
import { useRouter } from 'next/router';
import jwt from "jsonwebtoken";
import { TextField } from '@mui/material';
import { hasCookie, getCookie } from 'cookies-next';

export default function Home({ user }: { user: {email: string} }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/register");
  }

  console.log(user);
  
  return (
    <>
    <div className="items-center text-center justify-center h-screen space-y-4">
      <div className="text-4xl pt-20">Welcome to the MonopolyGO trading website!</div>
      <div className="text-2xl">Trading stickers made easy</div>
      <div className="pt-10 px-36">
        {!user.email && 
          <button 
            onClick={handleClick}
            className="mx-auto bg-teal-500 hover:bg-teal-700 text-white text-2xl font-bold py-6 px-10 rounded">
            Get started now!
          </button>
        }
        {user.email &&
          <div>
            <div className="text-2xl">
              Feedback, suggestions, or found a bug?
            </div>
            <div className="text-2xl pb-5">
              Send a message here:
            </div>
            <TextField
              fullWidth
              label="Message"
              multiline
              rows={5}
              placeholder="feedback..."
            />
          </div>
        }
      </div>

    </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }: {req: any, res: any }) => {

  if (!hasCookie('session', { req, res })) {
    return {
      props: {
        user: {}
      }
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
