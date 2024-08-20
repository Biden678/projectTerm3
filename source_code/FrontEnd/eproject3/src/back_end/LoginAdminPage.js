// LoginAdminPage.js
import React, { useContext, useEffect, useState } from 'react';
import './assets/css/LoginAdminPage.css'; // Tạo một file CSS riêng để tùy chỉnh giao diện
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Input from '../front_end/Input';
function LoginAdminPage(props) {
    const { loginAdmin,tokenAdmin,navigate } = useContext(AuthContext)


    useEffect(() => {
        // Check if there is no token and redirect to the login page
        if (!tokenAdmin) {
            navigate('/loginadminpage');
        }
    }, [tokenAdmin, navigate]);


    // useEffect(() => {
    //     // Check if there is no token and redirect to the login page
    //     if (tokenAdmin) {
    //         navigate('/homeAdminPage');
    //     }
    // }, []);
    const schema = yup.object({
        name: yup.
            string().required('Your Name is required'),
        password: yup
            .string().required('Your Password is required'),
    });
    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })
    const onSubmit = (data) => {
        axios.post("http://localhost:5044/api/Login", data)
            .then(response => {
                if (response.status === 200) {
                    // console.log("login",response.data);       
                    let tokenString = response.data.token;
                    loginAdmin(tokenString)
                }
                //neu khong chay then thi` xuong thang catch
            })
            .catch(error => {
                if (error.response.status === 404) {
                    // console.log("invalid credentials");
                    toast.error('Your account is not exist !', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
                else {
                    console.log(error);
                }
            })
    }
    return (
        <div className='box'>
            <div className="login-container mt-5">
                <h2>WELCOME ADMIN</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Name"
                        id="username"
                        type="text"
                        placeholder="Enter Name"
                        register={{ ...register("name") }}
                        className="form-control border-0 py-3"
                        errorMessage={errors.name?.message}
                    />
                    <br />
                    <Input
                        label="Password"
                        id="username"
                        type="password"
                        placeholder="Enter Pass"
                        register={{ ...register("password") }}
                        className="form-control border-0 py-3"
                        errorMessage={errors.password?.message}
                    />
                    <br />
                    <button class="button-64" type='submit'><span class="text">Login</span></button>
                </form>
            </div>
        </div>
    );
}

export default LoginAdminPage;