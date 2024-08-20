import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import Input from '../Input';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "react-toastify";
const ResetPassUI = () => {
    const { cus_id } = useParams();
    const location = useLocation();
    const { navigate } = useContext(AuthContext)
    const queryString = location.search;
    const codeStartIndex = 1;
    const code = queryString.substring(codeStartIndex);
    const schema = yup.object({
        NewPassword: yup
            .string()
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,12}$/, 'Password must contain at least one letter, one number, one special character, and be between 6 and 12 characters long')
            .required('Password is required'),
        ConfirmPassword: yup
            .string().oneOf([yup.ref('NewPassword'), null], 'ConfirmPassword and NewPassword must match')
            .required('Confirm Password is required'),
    });
    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })
    // useEffect(() => {
    //     console.log('cus_id:', cus_id);
    //     console.log('code:', code);
    // }, [cus_id, code]);
    async function onSubmit(data) {
        // console.log('Request Data:', requestData);
            await axios.put(`http://localhost:5044/api/ForgetPass/SetPassword?code=${code}`, data)
                // note : code
                .then(response => {
                    if (response.status === 200) {
                       reset();
                       toast.success('👌 Reset Password succcessfully', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                        navigate("/login");
                    }
                    //neu khong chay then thi` xuong thang catch
                })
                .catch(error => {
                    if (error.response && error.response.status === 400 && error.response.data) {
                        const { message } = error.response.data;
                        if (message === 'Your code has been used') {
                        //   setApiErrorMessage(message);
                        toast.error('The link you provided has already been used. Please proceed with the "Forgot Password" process to receive a new link.', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          });
                        }
                        console.log(error.response.data);
                      }


                })
        


    }

    return (
        <div>
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
                                            <label style={{ float: 'left' }}>New Password :</label>
                                            {/* <input type="password" className="form-control border-0 py-3" placeholder="Your new password . . ."
                                name="NewPassword" onChange={(e)=>handleChangeInput(e)} value={changeP.NewPassword}
                                /> */}
                                            <Input
                                                id="NewPassword"
                                                type="password"
                                                placeholder="Your NewPassword . . ."
                                                register={{ ...register("NewPassword") }}
                                                className="form-control border-0 py-3"
                                                errorMessage={errors.NewPassword?.message}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label style={{ float: 'left' }}>Confirm Password :</label>
                                            {/* <input type="password" className="form-control border-0 py-3" placeholder="Your confirm new password . . ."
                                                name="ConfirmPassword" onChange={(e) => handleChangeInput(e)} value={changeP.ConfirmPassword}
                                            /> */}
                                             <Input
                                                id="ConfirmPassword"
                                                type="password"
                                                placeholder="Your ConfirmPassword . . ."
                                                register={{ ...register("ConfirmPassword") }}
                                                className="form-control border-0 py-3"
                                                errorMessage={errors.ConfirmPassword?.message}
                                            />
                                        </div>
                                        <div className="text-start" style={{ float: 'right' }}>
                                            <button style={{ width: '100%' }} className="btn btn-success text-white py-3 px-5" type="submit">Set New Password</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default ResetPassUI;