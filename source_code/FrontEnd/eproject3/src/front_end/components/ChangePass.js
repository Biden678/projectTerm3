import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { useForm } from 'react-hook-form';
import Input from '../Input';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "react-toastify";
function ChangePass(props) {
    const{token,logout} = useContext(AuthContext)
    const cus_id = token?.Cus_id;
    const schema = yup.object({
        CurrentPassword: yup.
        string().required('Your Password is required'),
        NewPassword: yup
        .string()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,12}$/, 'Password must contain at least one letter, one number, one special character, and be between 6 and 12 characters long')
      .required('Password is required'),
        ConfirmPassword: yup
        .string().oneOf([yup.ref('NewPassword'), null], 'ConfirmPassword and NewPassword must match')
        .required('Confirm Password is required'),
      });
      const {handleSubmit,register,formState:{errors},reset} = useForm({
        resolver : yupResolver(schema)
      })
      const [apiErrorMessage, setApiErrorMessage] = useState("");
    async function onSubmit(data) {
            await axios.put(`http://localhost:5044/api/Users/ChangePassword${cus_id}`,data)
            .then(response=>
                {
                    if(response.status === 200){
                        toast('👌 Change your password is succcessful', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            });
                            reset();
                            logout();
                    }
                    //neu khong chay then thi` xuong thang catch
                })
            .catch(error=>{
                if (error.response && error.response.status === 400 && error.response.data) {
                    const { message } = error.response.data;
                    if (message === 'Current password is incorrect') {
                        setApiErrorMessage(message);
                        toast.error('Current password is incorrect !', {
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
                  }
                    // console.log("invalid credentials");
                    console.log(error);
            })
        
        
        
    }
    // console.log(token);
    return (
        <div>
            <div className="container-fluid py-5 mt-5">
                <div className="container py-5">
                    <div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{maxWidth:600}}>
                        <h1 className="mb-3">Change PASSWORD</h1>
                        <p className="mb-2">Please enter your current password and new password in the box below.</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="contact-detail position-relative p-5">
                        <div className="row g-5">
                            <div className="col-lg-12 wow fadeIn" data-wow-delay=".5s">
                                <div className="p-5 rounded contact-form">
                                    <div className="mb-4">
                                        {/* <label style={{float:'left'}}>Password :</label> */}
                                        <Input
                                        label="CurrentPassword:"
                                         id="passnow"
                                         type="password"
                                         placeholder="Enter CurrentPassword"
                                         register={{...register("CurrentPassword")}}
                                         className="form-control border-0 py-3"
                                         errorMessage={apiErrorMessage||errors.CurrentPassword?.message}
                                         labelStyle={{ float: 'left' }}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Input
                                        label="NewPassword:"
                                         id="passnew"
                                         type="password"
                                         placeholder="Enter NewPassword"
                                         register={{...register("NewPassword")}}
                                         className="form-control border-0 py-3"
                                         errorMessage={errors.NewPassword?.message}
                                         labelStyle={{ float: 'left' }}
                                        />
                                    </div>

                                    <div className="mb-4">
                                         <Input
                                        label="ConfirmPassword:"
                                         id="passconfirm"
                                         type="password"
                                         placeholder="Enter ConfirmPassword"
                                         register={{...register("ConfirmPassword")}}
                                         className="form-control border-0 py-3"
                                         errorMessage={errors.ConfirmPassword?.message}
                                         labelStyle={{ float: 'left' }}
                                        />
                                    </div>
                                    
                                    <div className="text-start" style={{float: 'right'}}>
                                        <button style={{width: '100%'}} className="btn btn-success text-white py-3 px-5" type="submit">Change Your Password</button>
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

export default ChangePass;