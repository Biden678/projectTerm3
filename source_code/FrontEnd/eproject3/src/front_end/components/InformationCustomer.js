import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { useForm } from 'react-hook-form';
import Input from '../Input';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "react-toastify";
function InformationCustomer(props) {
    const { token } = useContext(AuthContext)
    const cus_id = token?.Cus_id;

    //   const [editMode, setEditMode] = useState(false);
    const schema = yup.object().shape({
        cus_Phone: yup.
            string().matches(/^\d{10}$/, 'The phone number must be 10 digits long and should not contain letters or special characters.').required('Your Password is required'),
        cus_ADD: yup.string()
        .required('Your Address is required')
        .min(20, 'Address must be at least 20 characters')
        .matches(/^[a-zA-Z0-9\s]+$/, 'Address cannot contain special characters'),
    });
    const { handleSubmit, register, formState: { errors }, reset, setValue,} = useForm({
        resolver: yupResolver(schema)
    })
    const [infor, setInfor] = useState({})
    // const [changeinfor, setChangeInfor] = useState({
    //     cus_ADD: "",
    //     cus_Phone: ""
    // })
    const [update, setUpdate] = useState(false);
    const toggleInput = () => {
        setUpdate(!update);
        // setChangeInfor({ ...infor });
    };
    useEffect(() => {
        async function handleFetchUsers() {
            await axios.get(`http://localhost:5044/api/Users/${cus_id}`)
                .then(res => {
                    if (res.status === 200) {
                        setInfor(res.data.data)
                        //vi` trong config co dinh nghia~ r
                        setValue('cus_ADD', res.data.data.cus_ADD);
                        setValue('cus_Phone',res.data.data.cus_Phone);
                    }
                })
                .catch(err => console.log(err.response.data.errors))
            //taust
        }
        handleFetchUsers();
    }, [cus_id])
    const onSubmit = async (data) => {
        await axios.put(`http://localhost:5044/api/Users/${cus_id}`, data)
            .then(response => {
                if (response.status === 200) {
                
                    setInfor(response.data.data);
                    // console.log(infor);
                    setUpdate(false);
                    toast('👌 Update your information is succcessful', {
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
                //neu khong chay then thi` xuong thang catch
            })
            .catch(error => {
                if (error.response.status === 404) {
                    // console.log("invalid credentials");
                    alert("Your account is not exist");
                } else if (error.response.status === 400) {
                    console.log(error.response.data.errors);
                }
            })
    }
    // console.log(changeinfor);

    // console.log(infor);
    return (
        <div>
            <div className="container-fluid py-5 mt-5">
                <div className="container py-5">
                    <div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: 600 }}>

                        <h1 className="mb-3">PERSONAL INFORMATION</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <table className="table">
                            <div className="contact-detail position-relative p-5">
                                {/* <p className="mb-4 text-primary">Information</p> */}
                                <div className="row g-5">
                                    <div className="col-lg-12 wow fadeIn" data-wow-delay=".5s">
                                        <div className="p-5 rounded contact-form row">
                                            <tbody>
                                                {update ? (
                                                    <>
                                                        <tr>
                                                            <td><label style={{ float: 'left', color: 'black', paddingRight: "20px" }}><strong>Phone</strong></label></td>
                                                            <td>
                                                                {/* <input
                                                                    type="text"
                                                                    className="form-control border-0"
                                                                    value={changeinfor.cus_Phone}
                                                                    onChange={(e) => {
                                                                        handleChangeInput(e);
                                                                    }}
                                                                    name="cus_Phone" style=
                                                                /> */}
                                                                <Input
                                                                    style={{ width: 1000 }}
                                                                    id="Phone"
                                                                    type="text"
                                                                    placeholder="Enter cus_Phone"
                                                                    register={{ ...register("cus_Phone") }}
                                                                    className="form-control border-0 py-3"
                                                                    errorMessage={errors.cus_Phone?.message}
                                                                    labelStyle={{ float: 'left' }}
                                                                />
                                                            </td>
                                                        </tr>

                                                        <hr />

                                                        <tr>
                                                            <td><label style={{ float: 'left', color: 'black', paddingRight: "20px" }} htmlFor="Address"><strong>Address</strong></label></td>
                                                            <td>
                                                                {/* <input
                                                                    type="text"
                                                                    className="form-control border-0"
                                                                    value={changeinfor.cus_ADD}
                                                                    onChange={(e) => {
                                                                        handleChangeInput(e);
                                                                    }}
                                                                    name="cus_ADD" style={{ width: 1000 }}
                                                                /> */}
                                                                <Input
                                                                    id="Address"
                                                                    type="text"
                                                                    style={{ width: 1000 }}
                                                                    placeholder="Enter cus_ADD"
                                                                    register={{ ...register("cus_ADD") }}
                                                                    className="form-control border-0 py-3"
                                                                    errorMessage={errors.cus_ADD?.message}
                                                                    labelStyle={{ float: 'left' }}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <hr />
                                                    </>
                                                ) : (
                                                    <>
                                                     <tr>
                                                            <td>  <label style={{ float: 'left', color: 'black' }}><strong>Name</strong> : </label></td>
                                                            <td>{infor.cus_Name}</td>
                                                        </tr>
                                                        <hr />
                                                        <tr>
                                                            <td>  <label style={{ float: 'left', color: 'black' }}><strong>Email</strong> : </label></td>
                                                            <td>{infor.cus_Email}</td>
                                                        </tr>
                                                        <hr />
                                                        <tr>
                                                            <td> <label style={{ float: 'left', color: 'black' }}><strong>Address</strong> : </label></td>
                                                            <td>{infor.cus_ADD}</td>
                                                        </tr>
                                                        <hr />
                                                        <tr>
                                                            <td>  <label style={{ float: 'left', color: 'black' }}><strong>Phone</strong> : </label></td>
                                                            <td>{infor.cus_Phone}</td>
                                                        </tr>
                                                       
                                                        <hr />
                                                    </>
                                                )}


                                            </tbody>
                                        </div>
                                        <button className="btn btn-secondary" type="button" onClick={toggleInput}>
                                            {update ? 'Cancel' : 'Update'}
                                        </button>
                                        {update && (
                                            <button className="btn btn-primary" type="submit">Save</button>
                                        )}
                                    </div>

                                </div>

                            </div>

                        </table>


                    </form>



                </div>

            </div>

        </div>
    );
}

export default InformationCustomer;