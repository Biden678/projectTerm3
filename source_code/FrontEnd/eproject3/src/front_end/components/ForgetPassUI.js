import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import Input from '../Input';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
function ForgetPassUI(props) {
    const [apiErrorMessage, setApiErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();
    // const [changeP, setChangeP] = useState({
    //     Cus_Email: ""
    // })
    // function handleChangeInput(e) {
    //     const { name, value } = e.target;
    //     setChangeP({ ...changeP, [name]: value })
    // }
    const schema = yup.object({
        Cus_Email: yup.string().email('Invalid email format').required('Your Email is required'),
    });

    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })
    async function onSubmit(data) {
        try {
            setLoading(true);
            // Always send all fields to the API, even if they are empty
            const dataNeed = {
                ForgetPass: {
                    // Populate the properties of ForgetPassDTO as needed
                    // For example:
                    For_Id: 0, // Replace with the actual value
                    Cus_Email: data.Cus_Email,
                    Cus_Id: 0, // Replace with the actual value
                    Code: '', // Replace with the actual value
                    Status: 0
                },
                EmailRequest: {
                    Tomail: data.Cus_Email,
                    Subject: "This is the Link to reset your password",
                    HtmlContent: `This is link to Reset http://localhost:3000/reset-password/{user.Cus_Id}?{modelForgetPass.ForgetPass.Code}`,
                },
            };

            const response = await axios.post(
                `http://localhost:5044/api/ForgetPass?email=${data.Cus_Email}`,
                dataNeed
            );

            // Handle the response as needed
            if (response.status === 200) {
                toast.success('👌 Send Email to Forget succcessfully', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setApiErrorMessage("");
                reset();
            }
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data) {
                const { message } = error.response.data;
                if (message === 'Your Email is not exist') {
                    setApiErrorMessage(message);
                }
                console.log(error.response.data);
            }
        } finally {
            setLoading(false);
        }

    }

    return (
        <div>
            {loading && (
                <div id="spinner" className="show position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
                    <div className="spinner-grow text-primary" role="status"></div>
                </div>
            )}

            <div className="container-fluid py-5 mt-5">
                <div className="container py-5">
                    <div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: 600 }}>
                        <h1 className="mb-3">Reset PASSWORD</h1>
                        <p className="mb-2">Please enter your current password and new password in the box below.</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="contact-detail position-relative p-5">
                            <div className="row g-5">
                                <div className="col-lg-12 wow fadeIn" data-wow-delay=".5s">
                                    <div className="p-5 rounded contact-form">
                                        <div className="mb-4">
                                            <label style={{ float: 'left' }} htmlFor='userEmail'>Your Email to Reset your password :</label>
                                            {/* <input type="text" className="form-control border-0 py-3" placeholder="Your Email . . ."
                                                name="Cus_Email" onChange={(e) => handleChangeInput(e)} value={changeP.Cus_Email}
                                            /> */}
                                            <Input
                                                id="userEmail"
                                                type="text"
                                                placeholder="Your Email . . ."
                                                register={{ ...register("Cus_Email") }}
                                                className="form-control border-0 py-3"
                                                errorMessage={apiErrorMessage || errors.Cus_Email?.message}
                                            />
                                        </div>
                                        <div className="text-start" style={{ float: 'right' }}>
                                            <button style={{ width: '100%' }} className="btn btn-success text-white py-3 px-5" type="submit">Receive Link</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgetPassUI;