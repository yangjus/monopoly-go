import React, { useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { hasCookie } from "cookies-next";
import { stickers } from "../../constants/stickers";
import { useRouter } from "next/navigation";
import { FormControlLabel, Checkbox, Tooltip } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import moment from 'moment';
import emailjs from "@emailjs/browser";

export interface FormData {
    email: string;
    password: string;
    username: string;
    rank: number;
    invite: string;
    social: string;
}

export const labelName = {
    email: "Email*",
    password: "Password*",
    username: "MonopolyGO! Username*",
    rank: "MonopolyGO! Net Worth*",
    invite: "MonopolyGO! Invite Link",
    social: "Discord/Facebook/social link*",
}

export const formCheck = (formData: FormData) => {
    //Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        return "Please enter a valid email address.";
    }
    //Check username length
    if (formData.username.length > 20) {
        return "Please enter a username under 21 characters.";
    }

    //Check password strength
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z\d!@#$%^&*()\-_=+{};:,<.>]{8,}$/;;
    if (!formData.password || !passwordRegex.test(formData.password)) {
        return "Please enter a strong password (at least 8 characters, 1 letter and 1 number).";
    }

    //Validate rank
    if (!formData.rank || !Number.isInteger(Number(formData.rank)) || Number(formData.rank) < 0 || Number(formData.rank) > 20000) {
        return "Please enter a valid numerical rank (only numbers allowed).";
    }
    
    const inviteRegex = /^https:\/\/s\.scope\.ly\/[a-zA-Z0-9]{11}$/;
    //Validate invite link
    if (formData.invite && !inviteRegex.test(formData.invite)) {
        return "Please enter a valid invite link.";
    }

    //Make sure social link is required
    if (!formData.social) {
        return "Please enter a social (discord, facebook, etc.) link.";
    }

    return "";
}

export default function Register({ user }: { user: any }) {
    
    const { push } = useRouter();

    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        username: "",
        rank: 0,
        invite: "",
        social: "",
    });

    const formKeys = Object.keys(formData) as (keyof FormData)[];

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("Error Registrating. Try another valid email.");

    const [showPassword, setShowPassword] = useState<boolean>(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        // TODO: Submit the form data to the server
        const error_message: string = formCheck(formData);
        if (error_message !== "") {
            setError(true);
            setMessage(error_message);
            setSubmitting(false);
            return;
        }

        setError(false);

        try {
            const initialInventory = new Array(stickers.length).fill(0);
            const currentDate: moment.Moment = moment();
            //create random 8 digit code
            const random_code: number = Math.floor(10000000 + Math.random() * 90000000);

            const payload = { ...formData, trusted: false, inventory: initialInventory, last_logged: currentDate, code: random_code};
            const response = await axios.post("/api/register", payload);

            //send email verification
            const sendData: {to_email: string, verify_code: number} = {
                to_email: formData.email,
                verify_code: random_code
            }
            emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, 
                process.env.NEXT_PUBLIC_EMAILJS_VERIFY_TEMPLATE_ID!, sendData, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
              .then((result) => {
                //console.log(result);
              }, (error) => {
                //console.log(error);
                setError(true);
                setSubmitting(false);
                return;
            });
            // Reset form after successful submission
            setFormData({
                email: "",
                password: "",
                username: "",
                rank: 0,
                invite: "",
                social: "", 
            });
            setSuccess(true);
            push("/");
        } catch (error) {
            console.error(error); // log any errors that occur
            setError(true);
        }

        setSubmitting(false);
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    return (
    <>
    <div className="flex justify-center py-4">
        <form className="min-h-screen w-full max-w-sm" method="POST">
            <div className="text-4xl sm:py-4 text-center sm:text-left pb-6 sm:pb-2">Register Account</div>
            {formKeys.map((key: keyof FormData) => (
                <div className="mb-4" key={key}>
                    <label htmlFor={key} className="block capitalize text-gray-500 font-bold mb-2 flex justify-between">
                        {labelName[key]}
                        { key == "email" &&
                        <Tooltip title="an email verification code will be sent" placement='top'>
                            <InfoIcon 
                                style={{ 
                                    color: 'grey',
                                    marginBottom: '4px',
                                    marginLeft: '8px',
                                    fontSize: '1.5rem'
                                }}
                            />
                        </Tooltip>
                        }
                        { key == "password" && 
                        <FormControlLabel 
                            control={
                                <Checkbox 
                                    checked={showPassword} 
                                    onChange={togglePassword}
                                />
                            }
                            label="Show" 
                        />
                        }
                    </label>
                    <input
                        type={(key == "password" && !showPassword) ? "password" : "text"}
                        name={key}
                        id={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-teal-500"
                    />
                </div>
            ))}
            <div className="flex mb-4">A verification email will be sent to you shortly after submission.</div>
            <div className="flex items-center justify-center">
                <button 
                    type="button"
                    disabled={submitting}
                    onClick={() => handleSubmit}
                    className="shadow bg-teal-500 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                >
                    {submitting ? "Submitting..." : "Submit"}
                </button>
            </div>
            {success && (
            <p className="flex items-center text-green-500 mb-4 justify-center pt-6">
                Registration successful! Check your email for a verification code.
            </p>
            )}
            {error && (
            <p className="flex items-center text-red-500 mb-4 justify-center pt-6">{message}</p>
            )}
        </form>
    </div>
    </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }: {req: any, res: any }) => {

    if (!hasCookie('session', { req, res })) {
        return {
            props: {
              user: false
            }
        } 
    }

    return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }
}