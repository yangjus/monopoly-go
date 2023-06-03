import { GetServerSideProps } from "next";
import axios from "axios";
import { hasCookie } from "cookies-next";
import { useState, useEffect } from "react";

export default function Verify({ user }: { user: any }) {

    const [code, setCode] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean | null>(null);

    useEffect(() => {
        const handleKeyDown = (event: any) => {
          const inputs = document.querySelectorAll("#otp > *[id]");
          const currentIndex = Array.from(inputs).findIndex((input) => input === event.target);
    
          if (event.key === "Backspace") {
            const currentInput = inputs[currentIndex] as HTMLInputElement;
            currentInput.value = "";
            if (currentIndex !== 0) {
              const previousInput = inputs[currentIndex - 1] as HTMLInputElement;
              previousInput.focus();
            }
          } else {
            if (currentIndex === inputs.length - 1 && (inputs[currentIndex] as HTMLInputElement).value !== "") {
                return true;
            } else if ((event.keyCode > 47 && event.keyCode < 58) || (event.keyCode > 64 && event.keyCode < 91)) {
                const currentInput = inputs[currentIndex] as HTMLInputElement;
                currentInput.value = event.key;
                if (currentIndex !== inputs.length - 1) {
                  const nextInput = inputs[currentIndex + 1] as HTMLInputElement;
                  nextInput.focus();
                }
                event.preventDefault();
            }
          }
            let otpCode = "";
            const codeArray = Array.from(inputs);
            codeArray.map((input: any) => {
                otpCode += input.value;
            })
            setCode(otpCode);

        };
    
        const inputs = document.querySelectorAll("#otp > *[id]");
        inputs.forEach((input) => {
          input.addEventListener("keydown", handleKeyDown);
        });
    
        return () => {
          inputs.forEach((input) => {
            input.removeEventListener("keydown", handleKeyDown);
          });
        };
    }, []);

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setSubmitting(true);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const codeRegex = /^\d+$/;
        if (email && emailRegex.test(email) &&
            code && codeRegex.test(code) && 
            Number(code) >= 10000000 && Number(code) <= 99999999) {
            console.log("regex success")
        }
        else {
            setSuccess(false);
            setSubmitting(false);
            return;
        }

        try {
            const formData: {email: string, code: number} = {
                email: email,
                code: Number(code)
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

    const otpArr = Array.from(Array(8).keys());

    return (
    <div className="flex justify-center min-h-screen">
        <div className="pt-6 sm:pt-20">
            <div className="text-lg text-center sm:text-left sm:text-2xl pb-4">
                Enter 8-Digit Email Verification Code:
            </div>
            <div id="otp" className="flex flex-row justify-center text-center">
                {otpArr.map((value: number, key: number) => 
                    <input key={key} className="m-1 sm:m-2 border h-8 sm:h-12 bg-teal-200 w-8 sm:w-12 text-center form-control rounded" type="text" id={value.toString()} maxLength={1} />
                )}
            </div>
            <div className="text-lg text-center sm:text-left sm:text-2xl py-4">
                Enter Email Linked to Code:
            </div>
            <div>
                <input
                    type="text"
                    name="Email"
                    value={email}
                    onChange={onChange}
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-teal-500"
                />
                <div className="flex items-center justify-center">
                    <button 
                        onClick={handleSubmit}
                        type="button"
                        disabled={submitting}
                        className="shadow bg-teal-500 mt-4 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    >
                        {submitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
            {success && (
            <p className="flex items-center text-green-500 mb-4 justify-center pt-6">Your email is successfully verified! You can now login with your new account.</p>
            )}
            {success === false && (
            <p className="flex items-center text-red-500 mb-4 justify-center pt-6">Verification unsuccessful. You may be verified already. If still trouble verifying, reply to the verification email sent to you.</p>
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
