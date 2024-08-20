import axios from "axios";
import { useContext, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { AuthContext } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Input from "../../Input";
function Contact(props) {
    // const { navigate } = useContext(AuthContext)
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const schema = yup.object({
        Email: yup.
            string().required('Your Customer Name is required'),
        Subject: yup
            .string().required('Subject is required'),
        Title: yup
            .string().required('Title is required'),
    });
    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })
    const OnSubmit = async(data)=> {
        if (isCaptchaVerified) {
            try {
                const response = await axios.post('http://localhost:5044/api/Contact', data)
                if (response.status === 200) {
                    toast.success(' ♥ Thank for your Feedback about my website', {
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
                    
                }
            } catch (error) {
                if (error.response && error.response.status === 400 && error.response.data) {
                    const { message } = error.response.data;
                    if (message === 'Contact title contains forbidden words') {
                        toast.error(' Contact message contains forbidden words', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        })
                    }
                  }
                  console.log(error);
            }
        } else {
            toast('🤖verify capcha', {
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

    }
    const onChange = (e) => {
        setIsCaptchaVerified(!isCaptchaVerified);
        // console.log(e);
    }
    return (
        <div>

            {/* <!-- Contact Start --> */}
            <div className="container-fluid py-5 mt-5">
                <div className="container py-5">
                    <div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: 600 }}>
                        <h5 className="text-primary">Get In Touch</h5>
                        <h1 className="mb-3">Contact for any query</h1>
                        <p className="mb-2">Nếu bạn cảm thấy mệt mỏi thì <a href="https://i.pinimg.com/564x/84/b4/2e/84b42e07426c89f47d21932e334630f7.jpg">bấm vào đây</a>.</p>
                    </div>
                    {/*                                      FORM                                                                    */}

                    <div className="contact-detail position-relative p-5">
                        <div className="row g-5 mb-5 justify-content-center">

                            <div className="col-xl-5 col-lg-6 wow fadeIn" data-wow-delay=".5s">
                                <div className="d-flex bg-light p-3 rounded">
                                    <div className="flex-shrink-0 btn-square bg-secondary rounded-circle" style={{ width: 64, height: 64 }}>
                                        <i className="fa fa-phone text-white"></i>
                                        {/* <i className="fas fa-map-marker-alt text-white"></i> */}
                                    </div>
                                    <div className="ms-3">
                                        <h4 className="text-primary">Call Us</h4>
                                        <a className="h5" href="tel:+0123456789" target="_blank">+012 3456 7890</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-7 col-lg-6 wow fadeIn" data-wow-delay=".7s">
                                <div className="d-flex bg-light p-3 rounded">
                                    <div className="flex-shrink-0 btn-square bg-secondary rounded-circle" style={{ width: 64, height: 64 }}>
                                        <i className="fa fa-envelope text-white"></i>
                                    </div>
                                    <div className="ms-3">
                                        <h4 className="text-primary">Email Us</h4>
                                        <a className="h5" href="mailto:info@example.com" target="_blank">info@example.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(OnSubmit)}>
                            <div className="row g-5">
                                <div className="col-lg-7 wow fadeIn" data-wow-delay=".3s">
                                    <div className="p-5 h-100 rounded contact-map">
                                        <iframe className="rounded w-100 h-100" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.4710403339755!2d-73.82241512404069!3d40.685622471397615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c26749046ee14f%3A0xea672968476d962c!2s123rd%20St%2C%20Queens%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1686493221834!5m2!1sen!2sbd" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                    </div>
                                </div>
                                <div className="col-lg-5 wow fadeIn" data-wow-delay=".5s">
                                    <div className="p-5 rounded contact-form">
                                        <div className="mb-4">
                                            <Input
                                                id="userEmail"
                                                type="text"
                                                placeholder="Enter Customer Email"
                                                register={{ ...register("Email") }}
                                                className="form-control border-0 py-3"
                                                errorMessage={errors.Email?.message}
                                            />
                                        </div>
                                        <div className="mb-4">

                                            <Input
                                                id="userEmail"
                                                type="text"
                                                placeholder="Enter Subject"
                                                register={{ ...register("Subject") }}
                                                className="form-control border-0 py-3"
                                                errorMessage={errors.Subject?.message}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <textarea
                                                className="w-100 form-control border-0 py-3"
                                                rows="6"
                                                cols="10"
                                                name="Title"
                                                placeholder="Message"
                                                {...register('Title')}  // Register the textarea with useForm
                                            ></textarea>
                                            <span className="text-danger">{errors.Title?.message}</span>
                                        </div>
                                        <div className="text-start">
                                            <button className="btn bg-primary text-white py-3 px-5" type="submit">Send Message</button>
                                        </div>
                                        <ReCAPTCHA sitekey="6LeRVjIpAAAAANlG-fRy5BoTICNV-xTDVJqURMxh" onChange={onChange} />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
            {/* <!-- Contact End --> */}

        </div>
    );
}

export default Contact;