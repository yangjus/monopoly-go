import { GetServerSideProps } from "next";
import { useRouter } from 'next/router';
import jwt from "jsonwebtoken";
import { TextField, Grid } from '@mui/material';
import { hasCookie, getCookie } from 'cookies-next';
import emailjs from "@emailjs/browser";
import { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import User from "../../model/user_schema";
import connect from "../../lib/mongodb";
import DevicesIcon from '../../images/devices-filled.png';
import TopWave from '../styles/top-wave.svg';
import BottomWave from '../styles/bottom-wave.svg';
import Feature1 from "../styles/feature-1.svg";
import Feature2 from "../styles/feature-2.svg";
import Feature3 from "../styles/feature-3.svg";
import UpdateCard from "@component/components/UpdateCard";
import { changelog } from "../../constants/changelog";

export default function Home({ user, count }: { user: {email: string}, count: number }) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean>(false);

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

  const [userCount, setUserCount] = useState<number>(Math.floor((count - 1) / 10) * 10);
  const [message, setMessage] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>(user.email ? user.email : "");
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactEmail || contactEmail === "" || !emailRegex.test(contactEmail)) {
      setResult("Please enter a valid email address.");
      return;
    }
    const sendData: {from_email: string, message: string} = {
      from_email: contactEmail,
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
    <div className="items-center text-center justify-center p-0">
      {/*Hero*/}
      <section className="pt-10 bg-gradient-to-b from-teal-500 to-teal-100">
        <div className="container px-4 md:px-8 lg:px-16 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <div className="uppercase tracking-loose w-full">MGO Trading</div>
            <h1 className="my-4 text-5xl font-bold leading-tight">
              Trading Stickers Made Simple
            </h1>
            <div className="leading-normal text-2xl mb-8">
              Tired of searching for trades? Streamline your sticker trading experience with our automated market system.
            </div>
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
        <Image alt="top-wave" className="w-full" src={TopWave} />
      </section>
      {/* Features */}
      <section className="bg-white mt-4">
        <div className="container max-w-5xl mx-auto m-8">
          <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            Features
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto bg-gradient-to-r from-teal-500 to-teal-100 w-64 my-0 py-0 rounded-t"></div>
          </div>
          <Grid container rowSpacing={isMobile ? 4 : 8} columnSpacing={3} className="p-6 justify justify-center items-center">
            {/* First Feature */}
            { isMobile && 
              <Grid item xs={12} sm={6} className="flex justify-center items-center">
                <Image alt="first-feature" src={Feature1} style={{ width: '90%', height: 'auto' }}/>
              </Grid>
            }
            <Grid item xs={12} sm={6}>
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-4">
                Keep Track of Your Stickers
              </h3>
              <div className="text-gray-600">
                Effortlessly log and track your MonopolyGO sticker inventory on your MGOTrading Profile and 
                instantly view stickers you need and have extras of.
                <br/><br/>
                Conveniently copy a trading list to your clipboard for seamless sharing on any platform!
              </div>
              { isMobile &&
                <div className="w-full mt-4">
                  <div className="h-1 mx-auto bg-teal-300 opacity-50 w-32 my-0 py-0 rounded-t"></div>
                </div>
              }
            </Grid>
            { !isMobile && 
              <Grid item xs={12} sm={6} className="flex justify-center items-center">
                <Image alt="first-feature" src={Feature1} style={{ width: '90%', height: 'auto' }}/>
              </Grid>
            }
            {/* Second Feature */}
            <Grid item xs={12} sm={6} className="flex justify-center items-center">
              <Image alt="second-feature" src={Feature2} style={{ width: '90%', height: 'auto' }}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-4">
                MGOTrading Sticker Marketplace
              </h3>
              <div className="text-gray-600">
                After logging your stickers, our marketplace system matches you with other registered MGOTrading 
                users who have what you need, and want what you have.
                <br/><br/>
                Easily filter your desired stickers based on album and star type and access 
                their social platform and MonopolyGO invite link to initiate trading!
              </div>
              { isMobile &&
                <div className="w-full mt-4">
                  <div className="h-1 mx-auto bg-teal-300 opacity-50 w-32 my-0 py-0 rounded-t"></div>
                </div>
              }
            </Grid>
            {/* Third Feature */}
            { isMobile && 
              <Grid item xs={12} sm={6} className="flex justify-center items-center">
                <Image alt="third-feature" src={Feature3} style={{ width: '80%', height: 'auto' }}/>
              </Grid>
            }
            <Grid item xs={12} sm={6}>
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-4">
                Chat with Others
              </h3>
              <div className="text-gray-600">
                When you match with a fellow MGOTrading user, initiating a trade with them 
                through our Direct Messaging feature. Seamlessly communicate and coordinate your trade details with ease.
                <br/><br/>
                Looking for a casual conversation? Engage with our real-time Global Chat feature 
                to connect with fellow users and expand your network!
              </div>
            </Grid>
            { !isMobile && 
              <Grid item xs={12} sm={6} className="flex justify-center items-center">
                <Image alt="third-feature" src={Feature3} style={{ width: '80%', height: 'auto' }}/>
              </Grid>
            }
          </Grid>
        </div>
      </section>
      {/* Recent Changelog */}
      <section className="bg-gray-100 pt-4">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            Recent Changelog
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto bg-gradient-to-r from-teal-500 to-teal-100 w-64 my-0 py-0 rounded-t"></div>
          </div>
          <Grid container
            style={{
              maxHeight: "100vh",
              overflowY: "auto",
              overflowX: "hidden",
              height: "400px",
              overflow: "auto",
            }}
            rowSpacing={4}
          >
            {changelog.map((item, i) => (
              <Grid item key={i} xs={12} md={4} className="mb-8 lg:mb-4">
                  <UpdateCard update={item} />
              </Grid>
            ))}
          </Grid>
        </div>
      </section>
      {/* Community */}
      <section className="text-center bg-white mt-8 mb-4">
        <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center">
          Community
        </h2>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto bg-white opacity-50 w-1/6 my-0 py-0 rounded-t"></div>
        </div>
        <Grid container className="px-0 md:px-10">
            <Grid item xs={12} md={5}>
              <div className="text-2xl font-bold">
                Number of Registered MGOTrading Users
              </div>
              <div className="flex justify-center items-center align-center border-4 border-teal-300 rounded-lg text-6xl font-bold pl-8 p-4 m-8 text-teal-300">
                {userCount}+
              </div>
            </Grid>
            <Grid item xs={12} md={7}>
              <h3 className="text-2xl leading-tight mx-4">
                <div>
                  Feedback, suggestions, or want to chat with other MonopolyGO players?
                </div>
                <div>
                  Join our Discord and find channel <u>#mgo-website-chat</u>
                </div>
              </h3>
              <button className="mx-auto lg:mx-0 hover:underline bg-teal-500 text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                <Link 
                  href="https://discord.gg/EaTfg29rPF" 
                  className="mx-2" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Join Us Now
                </Link>
              </button>
            </Grid>
        </Grid>
      </section>
      {/* Feedback */}
      <section className="text-center bg-gradient-to-b from-teal-100 to-teal-500">
        <Image alt="bot-wave" className="w-full" src={BottomWave} />
        <div className="py-6 px-12 sm:px-24">
          <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center">
            Contact Us
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto bg-white opacity-50 w-1/6 my-0 py-0 rounded-t"></div>
          </div>
          <TextField
            fullWidth
            label="Message"
            multiline
            rows={5}
            placeholder="feedback..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="bg-white rounded-lg my-4"
          />
          <div className="my-2">
          <Grid 
            container   
            direction="row"
            alignItems="center"
            rowSpacing={3}
          >
              <Grid item xs={12} md={8}>
                  <Grid container rowSpacing={1} alignItems="center">
                    <Grid item xs={12} sm={5} md={4} lg={3}>
                      <div className="text-xl text-gray-100 font-semibold flex items-center leading-tight mr-4 whitespace-nowrap">
                        Email Address<span className="text-red-500">*</span>:
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={7} md={8} lg={9}>
                      <TextField
                        label="Email"
                        value={contactEmail}
                        onChange={(event) => setContactEmail(event.target.value)}
                        fullWidth
                        className="bg-white rounded-lg"
                      />
                    </Grid>
                  </Grid>
              </Grid>
              <Grid item xs={12} md={4} className="flex justify-center md:justify-end">
                <form method="POST">
                  <button 
                    onClick={submitMessage}
                    type="button" 
                    className="hover:underline bg-white text-gray-800 font-bold rounded-full py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                  >
                    Submit Message
                  </button>
                </form>
              </Grid>
          </Grid>
          </div>
          {result !== "" &&
            <p className="md:flex md:items-center text-white justify-center pt-6">{result}</p>
          }
        </div>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }: {req: any, res: any }) => {

  connect();
  const userCount: number = await User.countDocuments();

  if (!hasCookie('session', { req, res })) {
    return {
      props: {
        user: {},
        count: userCount
      }
    }
  }

  const token: any = getCookie('session', { req, res });

  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN!);

  return {
    props: {
      user: decodedToken,
      count: userCount
    }
  }
}
