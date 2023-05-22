import { GetServerSideProps } from "next";
import axios from "axios";
import { hasCookie } from "cookies-next";
import { useState, useEffect } from "react";
import ReactCodeInput from 'react-verification-code-input';

export default function Verify({ user }: { user: any }) {

    const [code, setCode] = useState<number>(0);
    const [email, setEmail] = useState<string>("");
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean | null>(null);

    useEffect(() => {
        console.log(code)
        console.log(email)
    }, [code, email])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && emailRegex.test(email) &&
            code >= 10000000 && code <= 99999999) {
            console.log("success")
        }
        else {
            setSuccess(false);
            setSubmitting(false);
            return;
        }

        try {
            const formData: {email: string, code: number} = {
                email,
                code
            }
            const response = await axios.post("/api/verify_email", formData);
            if (response) {
                setSuccess(true);
            }
        } catch (error) {
            console.error(error); // log any errors that occur
            setSuccess(false);
        }

        setSubmitting(false);
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    return (
    <div className="h-screen flex justify-center">
        <div className="pt-20">
            <div className="text-2xl pb-4">
                Enter 8-Digit Email Verification Code:
            </div>
            <ReactCodeInput 
                type="number"
                fields={8}
                onChange={(val) => setCode(Number(val))}
            />
            <div className="text-2xl py-4">
                Enter Email Linked to Code:
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="Email"
                        value={email}
                        onChange={onChange}
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-teal-500"
                    />
                    <div className="flex justify-center">
                        <button 
                            type="submit"
                            disabled={submitting}
                            className="shadow bg-teal-500 mt-4 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        >
                            {submitting ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
            {success && (
            <p className="md:flex md:items-center text-green-500 mb-4 justify-center pt-6">Your email is successfully verified! You can now login with your new account.</p>
            )}
            {success === false && (
            <p className="md:flex md:items-center text-red-500 mb-4 justify-center pt-6">Verification unsuccessful. Double check your email and/or code.</p>
            )}
        </div>
    </div>
    )
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