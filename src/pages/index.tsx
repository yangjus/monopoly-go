import { GetServerSideProps } from "next";
import { useRouter } from 'next/router';
import jwt from "jsonwebtoken";
import { TextField, Grid } from '@mui/material';
import { hasCookie, getCookie } from 'cookies-next';
import emailjs from "@emailjs/browser";
import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import DevicesIcon from '../styles/devices.svg';
import TopWave from '../styles/top-wave.svg';
import BottomWave from '../styles/bottom-wave.svg';
import UpdateCard from "@component/components/UpdateCard";
import { changelog } from "../../constants/changelog";

export default function Home({ user }: { user: {email: string} }) {
  const router = useRouter();

  const [message, setMessage] = useState<string>("");
  const [result, setResult] = useState<string>("");

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
    <div className="p-0">
    <div className="items-center text-center justify-center">
      {!user.email && 
      <div>
        {/*Hero*/}
        <section className="pt-10 bg-gradient-to-b from-teal-500 to-teal-100">
          <div className="container px-4 md:px-8 lg:px-16 mx-auto flex flex-wrap flex-col md:flex-row items-center">
            <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
              <p className="uppercase tracking-loose w-full">MGO Trading</p>
              <h1 className="my-4 text-5xl font-bold leading-tight">
                Trading Stickers Made Simple
              </h1>
              <p className="leading-normal text-2xl mb-8">
                Tired of searching for trades? Streamline your sticker trading experience with our automated market system.
              </p>
              <button 
                onClick={handleClick}
                className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mb-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
              >
                Get Started
              </button>
            </div>
            <div className="w-full md:w-3/5 text-center content-center pr-4 sm:p-0">
              <Image alt="devices" src={DevicesIcon} />
            </div>
          </div>
          <Image alt="top-wave" src={TopWave} />
        </section>
        {/* Recent Changelog */}
        <section className="bg-white pt-4">
          <div className="container mx-auto flex flex-wrap pt-4 pb-12">
            <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
              Recent Changelog
            </h2>
            <div className="w-full mb-4">
              <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
            </div>
            <Grid container>
              {changelog.map((item, i) => (
                <Grid item key={i} xs={12} md={4}>
                  <UpdateCard update={item} />
                </Grid>
              ))}
            </Grid>
          </div>
        </section>
        {/* Feedback */}
        <section className="container mx-auto text-center bg-gradient-to-b from-teal-100 to-teal-500">
          <Image alt="bot-wave" src={BottomWave} />
          <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center">
            Community
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <h3 className="my-4 text-3xl leading-tight mx-4">
            <div>
              Feedback, suggestions, or found a bug?
            </div>
            <div>
              Join our Discord and find channel #mgo-website-chat
            </div>
          </h3>
          <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
            <Link 
              href="https://discord.gg/EaTfg29rPF" 
              className="mx-2" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Join Us Now
            </Link>
          </button>
        </section>
      </div>
      }
      {/* User is Logged In */}
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
              href="https://discord.gg/EaTfg29rPF" 
              className="mx-2 text-blue-600" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              here
            </Link>
            in channel #mgo-website-chat
          </div>
        </div>
      }
    </div>
    </div>
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
