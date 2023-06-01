import { GetServerSideProps } from "next";
import { useRouter } from 'next/router';
import jwt from "jsonwebtoken";
import { TextField, Grid } from '@mui/material';
import { hasCookie, getCookie } from 'cookies-next';
import emailjs from "@emailjs/browser";
import { useState } from "react";
import Link from 'next/link';

export default function Home({ user }: { user: {email: string} }) {
  const router = useRouter();

  const [message, setMessage] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [updates, setUpdates] = useState<boolean>(true);

  const handleClick = () => {
    router.push("/register");
  }

  const submitMessage = (e: any) => {
    e.preventDefault();
    if (message === "") {
      setResult("Please send a valid message.");
      return;
    }
    const sendData: {from_email: string, message: string} = {
      from_email: user.email,
      message: message
    }

    emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, 
      process.env.NEXT_PUBLIC_EMAILJS_FEEDBACK_TEMPLATE_ID!, sendData, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
    .then((result) => {
      //console.log(result);
      setMessage("");
      setResult("Message has been successfully sent.");
    }, (error) => {
      //console.log(error);
      setResult("There is an error sending the message.");
    });
  }
  
  return (
    <>
    <div className="items-center text-center justify-center space-y-4">
      <div className="text-4xl pt-20">Welcome to the MonopolyGO trading website!</div>
      <div className="text-2xl">Trading stickers made easy</div>
      <div className="py-5 px-36">
        {!user.email && 
          <button 
            onClick={handleClick}
            className="mx-auto bg-teal-500 hover:bg-teal-700 text-white text-2xl font-bold py-6 px-10 rounded">
            Get started now!
          </button>
        }
      </div>
        {updates &&
          <div className="rounded bg-teal-600 p-6 text-white mx-32">
            <Grid container className="flex text-left">
              <Grid item xs={12}>
                Bug Fixes and Other New Features:
              </Grid>
              <Grid item xs={12}>
                <ul>
                  <li className="ml-8">- Added a direct message pop up feature next to username</li>
                  <li className="ml-8">- Fixed bug where user could not create a new DM with another user</li>
                  <li className="ml-8">- Fixed bug where there would be multiple conversations between the same two users</li>
                  <li className="ml-8">- Added text to tell user if they didn't match with any users in the trading page</li>
                  <li className="ml-8">- Other small UI and bug changes</li>
                </ul>
              </Grid>
              <Grid item xs={12}>
                Mobile responsive version in the making!
              </Grid>
            </Grid>
          </div>
        }
        <div className="py-5 px-36">
        {user.email &&
          <div>
            <div className="text-2xl">
              Feedback, suggestions, or found a bug?
            </div>
            <div className="text-2xl pb-4">
              Send a message here:
            </div>
            <TextField
              fullWidth
              label="Message"
              multiline
              rows={5}
              placeholder="feedback..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <form method="POST">
              <button
                onClick={submitMessage}
                type="button" 
                className="border border-white mt-5 bg-teal-500 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>
            {result !== "" &&
              <p className="md:flex md:items-center text-teal-500 mb-4 justify-center pt-6">{result}</p>
            }
            <div className="text-2xl py-4">
              or send a message through Discord 
              <Link 
                href="https://discord.gg/GsNxnVqJDc" 
                className="mx-2 text-blue-600" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                here
              </Link>
              in channel #website-chat
            </div>
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

  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN!);

  return {
    props: {
      user: decodedToken
    }
  }
}
