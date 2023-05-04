import React, { useState } from "react";

interface FormData {
    email: string;
    password: string;
    username: string;
    rank: number;
    invite: string;
    social: string;
}

const labelName = {
    email: "Email*",
    password: "Password*",
    username: "MonopolyGO! Username*",
    rank: "MonopolyGO! Rank",
    invite: "MonopolyGO! Invite Link",
    social: "Discord/Facebook/social link*",
}

export default function Register() {
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
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        // TODO: Submit the form data to the server
        // Example code for simulating a successful form submission after 2 seconds
        setTimeout(() => {
            setSubmitting(false);
            setSuccess(true);
        }, 2000);
    };

  return (
    <div className="flex justify-center py-4">
        <form className="min-h-screen w-full max-w-sm" onSubmit={handleSubmit}>
            <div className="text-4xl py-4">Register Account</div>
            {formKeys.map((key: keyof FormData) => (
                <div className="mb-4">
                    <label htmlFor={key} className="block capitalize text-gray-500 font-bold mb-2">
                        {labelName[key]}
                    </label>
                    <input
                        type="text"
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
            <p className="md:flex md:items-center text-green-500 mb-4 justify-center pt-6">Registration successful!</p>
            )}
        </form>
    </div>
  );
}