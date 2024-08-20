import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import Input from '../Input';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
function Login(props) {
    const{login} = useContext(AuthContext)
    const schema = yup.object({
        Name: yup.
        string().required('Your Customer Name is required'),
        Password: yup
        .string().required('Password is required'),
      });
      const {handleSubmit,register,formState:{errors},reset} = useForm({
        resolver : yupResolver(schema)
      })

    const onSubmit = async(data) => {
            axios.post("http://localhost:5044/api/Login",data)
                .then(response=>
                    {
                        if(response.status === 200){
                            // console.log("login",response.data);       
                            let tokenString = response.data.token;
                            login(tokenString)
                        }
                        //neu khong chay then thi` xuong thang catch
                    })
                .catch(error=>{
                    if(error.response.status===404){
                        // console.log("invalid credentials");
                        // alert("");
                        toast('😥 Your account is not exist', {
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
                    else{
                        console.log(error);
                    }
                })
        
    }
    return (
        <div>
            <div className="container-fluid py-5 mt-5">
                <div className="container py-5">
                    <div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{maxWidth:600}}>
                        <h1 className="mb-3">WELCOME TO US</h1>
                        <p className="mb-2">Register to immediately receive incentives and support from TEAM2 Insurance 24/7.</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="contact-detail position-relative p-5">
                        <div className="row g-5">
                            <div className="col-lg-12 wow fadeIn" data-wow-delay=".5s">
                                <div className="p-5 rounded contact-form">
                                    <div className="mb-4">
                                       <Input
                                        id="username"
                                        type="text"
                                        placeholder="Enter Customer Name"
                                        register={{...register("Name")}}
                                        className="form-control border-0 py-3"
                                        errorMessage={errors.Name?.message}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Input
                                        id="userpass"
                                        type="password"
                                        placeholder="Enter Customer Password"
                                        register={{...register("Password")}}
                                        className="form-control border-0 py-3"
                                        errorMessage={errors.Password?.message}
                                        />
                                    </div>
                                    <a style={{float: 'left'}} href="/forgetpass">Forgot password ?</a>
                                    <div className="text-start" style={{float: 'right'}}>
                                        <button style={{width: '100%'}} className="btn btn-success text-white py-3 px-5" type="submit">Sign In</button>
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

export default Login;