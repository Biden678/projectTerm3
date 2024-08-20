import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from '../Input';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from 'react-toastify';
function SighUp(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const schema = yup.object({
    Cus_Name: yup.string().required('Your Customer Name is required'),
    Cus_Phone: yup.string().matches(/^\d{10}$/, 'The phone number must be 10 digits long and should not contain letters or special characters.').required('Phone number is required'),
    Cus_ADD: yup.string()
      .required('Your Address is required')
      .min(20, 'Address must be at least 20 characters')
      .max(100, 'Address must be at greatest 100 characters')
      .matches(/^[a-zA-Z0-9\s/]+$/, 'Address cannot contain special characters except /'),
    Cus_Email: yup.string().email('Invalid email format').required('Your Email is required'),
    Cus_Password: yup
      .string()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,12}$/, 'Password must contain at least one letter, one number, one special character, and be between 6 and 12 characters long')
      .required('Password is required'),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref('Cus_Password'), null], 'ConfirmPassword and Password must match')
      .required('Confirm Password is required'),
  });
  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  })
  //  async function onSubmit(e) {
  //   e.preventDefault();
  //   try {
  //     // Always send all fields to the API, even if they are empty
  //     const data = {
  //       EmailRequest: {
  //         Tomail: user.Cus_Email,
  //         Subject: "Verify email to activate your account",
  //         HtmlContent: `This is the link to verify`,
  //       },
  //       Users: {
  //         Cus_Name: user.Cus_Name,
  //         Cus_Password: user.Cus_Password,
  //         Cus_Email: user.Cus_Email,
  //         Cus_Phone: user.Cus_Phone,
  //         Cus_ADD: user.Cus_ADD
  //       },
  //     };

  //     const response = await axios.post("http://localhost:5044/api/Users",data);
  //     if (response.status === 200) {
  //       // Successful submission
  //       alert("Sign up successfully,please verify your account")
  //       navigate("/login");
  //       setUser({
  //         Cus_Name: "",
  //         Cus_Password: "",
  //         Cus_Email: "",
  //         Cus_Phone: "",
  //         Cus_ADD: ""
  //       });
  //     } 
  //   } catch (error) {
  //     if (error.response && error.response.status === 400) {
  //       // Validation errors from the API
  //       // console.log(error.response.data.errors);

  //     // console.log("Haha");
  //     } else {
  //       // Handle other types of errors (network issues, server errors, etc.)
  //       console.error("Error submitting the form:", error);
  //     }
  //   }
  // }
  const onSubmit = async (data) => {

    try {

      setLoading(true);

      const dataNeeded = {
        EmailRequest: {
          Tomail: data.Cus_Email,
          Subject: "Verify email to activate your account",
          HtmlContent: `This is the link to verify`,
        },
        Users: {
          Cus_Name: data.Cus_Name,
          Cus_Password: data.Cus_Password,
          Cus_Email: data.Cus_Email,
          Cus_Phone: data.Cus_Phone,
          Cus_ADD: data.Cus_ADD,
        },
      };

      // Data is automatically populated from the registered fields
      const response = await axios.post("http://localhost:5044/api/Users", dataNeeded);
      if (response.status === 200) {
        toast.success('👌 Sign up succcessfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // You may choose to navigate or reset the form, depending on your requirements
        reset();
        navigate("/login")

      }
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data) {
        const { message } = error.response.data;
        if (message === 'Email and name already registered') {
       
          toast.error('Both email and name are already registered !', {
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
        else if (message === 'Email already registered') {
          toast.error('Email already registered', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (message === 'Your name already registed') {
          toast.error('Your name already registed', {
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
    } finally {
      setLoading(false);
    }
  };
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
            <h1 className="mb-3">JOIN TODAY</h1>
            <p className="mb-2">Register to immediately receive incentives and support from TEAM2 Insurance 24/7.</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>SighUp To Be Project You</h1>
            <div className="contact-detail position-relative p-5">
              <div className="row g-5">
                <div className="col-lg-12 wow fadeIn" data-wow-delay=".5s">
                  <div className="p-5 rounded contact-form">
                    <div className="mb-4">
                      {/* <input type="text" className="form-control border-0 py-3" placeholder="Your Name" 
                                        name="Cus_Name" value={user.Cus_Name} 
                                        onChange={(e)=>handleChangeInput(e)}
                                        /> */}
                      <Input
                        id="username"
                        type="text"
                        placeholder="Enter Customer name"
                        register={{ ...register("Cus_Name") }}
                        className="form-control border-0 py-3"
                        errorMessage={errors.Cus_Name?.message}
                      />
                    </div>

                    <div className="row">
                      <div className="mb-4 col-lg-12">
                        <Input
                          id="Phone"
                          type="text"
                          placeholder="Enter Customer Phone"
                          register={{ ...register("Cus_Phone") }}
                          className="form-control border-0 py-3"
                          errorMessage={errors.Cus_Phone?.message}
                        />
                      </div>

                      <div className="mb-4 col-lg-12">
                        <Input
                          id="ADD"
                          type="text"
                          placeholder="Enter Customer Address"
                          register={{ ...register("Cus_ADD") }}
                          className="form-control border-0 py-3"
                          errorMessage={errors.Cus_ADD?.message}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <Input
                        id="Email"
                        type="text"
                        placeholder="Enter Customer Email"
                        register={{ ...register("Cus_Email") }}
                        className="form-control border-0 py-3"
                        errorMessage={errors.Cus_Email?.message}
                      />
                    </div>

                    <div className="mb-4">
                      <Input
                        id="Password"
                        type="password"
                        placeholder="Enter Customer Password"
                        register={{ ...register("Cus_Password") }}
                        className="form-control border-0 py-3"
                        errorMessage={errors.Cus_Password?.message}
                      />
                    </div>

                    <div className="mb-4">
                      <Input
                        id="ConfirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        register={{ ...register("confirmpassword") }}
                        className="form-control border-0 py-3"
                        errorMessage={errors.confirmpassword?.message}
                      />
                    </div>

                    <div className="text-start" style={{ float: 'right' }}>
                      <button style={{ width: '100%' }} className="btn btn-success text-white py-3 px-5" type="submit">Sign Up</button>
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

export default SighUp;