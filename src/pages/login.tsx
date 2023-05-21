import React, { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GetServerSideProps } from "next";
import jwt from "jsonwebtoken";
import Navbar from "@component/components/Navbar";
import { hasCookie } from 'cookies-next';
import { FormControlLabel, Checkbox } from "@mui/material";

interface FormData {
    email: string;
    password: string;
}

export default function Register({ user }: { user: any }) {
    const { push } = useRouter();

    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });

    const formKeys = Object.keys(formData) as (keyof FormData)[];

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState<boolean | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await axios.post("/api/login", formData);
            if (response.status === 200) {
                //bug where when logging in, the page renders in faster than the navbar can change
                push("/");
            }
        } catch (error) {
            console.error(error); // log any errors that occur
            setSuccess(false);
            setSubmitting(false);
            return;
        }

        setSuccess(true);
        setSubmitting(false);
    };

  return (
    <>
    <div className="flex justify-center py-4">
        <form className="min-h-screen w-full max-w-sm" onSubmit={handleSubmit}>
            <div className="text-4xl py-4">Login</div>
            {formKeys.map((key: keyof FormData) => (
                <div className="mb-4">
                    <label htmlFor={key} className="block capitalize text-gray-500 font-bold mb-2 flex justify-between">
                        {key}*
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
            <div className="md:flex md:items-center justify-center">
                <button 
                    type="submit"
                    disabled={submitting}
                    className="shadow bg-teal-500 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                >
                    {submitting ? "Submitting..." : "Submit"}
                </button>
            </div>
            {success && (
            <p className="md:flex md:items-center text-green-500 mb-4 justify-center pt-6">Login successful!</p>
            )}
            {success === false && (
            <p className="md:flex md:items-center text-red-500 mb-4 justify-center pt-6">Login unsuccessful.</p>
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