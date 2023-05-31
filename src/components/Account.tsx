import React, { useState } from "react"
import axios from "axios";
import { FormData, labelName, formCheck } from "@component/pages/register";
import { FormControlLabel, Checkbox } from "@mui/material";

export default function Account({user}: {user: any}) {

    const labelEnabled = {
        email: false,
        password: true,
        username: false,
        rank: true,
        invite: true,
        social: true,
    }

    const [formData, setFormData] = useState<FormData>({
        email: user.email,
        password: user.password,
        username: user.username,
        rank: user.rank,
        invite: user.invite,
        social: user.social,
    });

    const formKeys = Object.keys(formData) as (keyof FormData)[];

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("error registrating");

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
            const response = await axios.post("/api/update-profile", formData);
            //console.log(response.data); // log the response data for debugging
            // Reset form after successful submission
            setSubmitting(false);
            setSuccess(true);
        } catch (error) {
            console.error(error); // log any errors that occur
            setError(true);
        }
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    return (
    <div>
        <div className="text-2xl text-white">Account Info</div>
        <form className="min-h-screen w-full max-w-sm pt-5 mx-auto" onSubmit={handleSubmit}>
            {formKeys.map((key: keyof FormData) => (
                <div className="mb-4" key={key}>
                    <label htmlFor={key} className="block capitalize text-white font-bold mb-2 flex justify-between">
                        {labelName[key]}
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
                        disabled={!labelEnabled[key]}
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
                    className="border border-white bg-teal-500 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                >
                    {submitting ? "Saving..." : "Save"}
                </button>
            </div>
            {success && (
            <p className="md:flex md:items-center text-white mb-4 justify-center pt-6">Saved successfully!</p>
            )}
            {error && (
            <p className="md:flex md:items-center text-white mb-4 justify-center pt-6">{message}</p>
            )}
        </form>
    </div>
    );
};