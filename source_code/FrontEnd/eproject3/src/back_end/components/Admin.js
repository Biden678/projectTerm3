import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./User.css"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Input from '../../front_end/Input';
// import Modal from 'react-modal';
function User(props) {
  // npm install react-confirm-alert
  //npm install react-modal
  const [users, setUsers] = useState([])
  const schema = yup.object().shape({
    Cus_Name: yup.string().required('Your Customer Name is required'),
    Cus_Phone: yup.string().matches(/^\d{10}$/, 'Invalid phone number').required('Phone number is required'),
    Cus_ADD:yup
    .string()
    .required('Your Address is required')
    .min(20, 'Address must be at least 20 characters')
    .max(100, 'Address must be at greatest 100 characters')
    .matches(/^[a-zA-Z0-9\s/]+$/, 'Address cannot contain special characters except /'),
    Cus_Email: yup.string().email('Invalid email format').required('Your Email is required'),
    Cus_Password: yup
      .string()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,12}$/, 'Password must contain at least one letter, one number, one special character, and be between 6 and 12 characters long')
      .required('Password is required'),
  });
  const updateSchema = yup.object().shape({
    cus_ADD:yup
    .string()
    .required('Your Address is required')
    .min(20, 'Address must be at least 20 characters')
    .max(100, 'Address must be at greatest 100 characters')
    .matches(/^[a-zA-Z0-9\s/]+$/, 'Address cannot contain special characters except /'),
     cus_Phone: yup
     .string().matches(/^\d{10}$/, 'The phone number must be 10 digits long and should not contain letters or special characters.')
     .required('Phone number is required'),
    // ... other fields for update
  });
  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  })
  const { handleSubmit: handleSubmitUpdate, register: registerUpdate, formState: { errors: errorsUpdate }, reset: resetUpdate, setValue } = useForm({
    resolver: yupResolver(updateSchema)
  });
  const [fullInfor, setfullInfor] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [btnInput, setBtnInput] = useState(false);
  // const [NewUser, setNewUser] = useState({
  //   cus_Name: "",
  //   cus_Password: "",
  //   cus_Email: "",
  //   cus_Phone: "",
  //   cus_ADD: "",
  // })
  const [IsUpdate, setIsUpdate] = useState(false)
  const [RowToUpdate, setRowToUpdate] = useState(null)
  const buttonStyle = {
    border: 'none',
    outline: 'none',
    background: 'none',
    paddingRight: '10px',
  };
  useEffect(() => {
    async function handleFetchUsers() {
      await axios.get('http://localhost:5044/api/Users')
        .then(res => {
          if (res.status === 200) {
            setUsers(res.data.data)
            //vi` trong config co dinh nghia~ r
            //  console.log(users);
          }
        })
        .catch(err => console.log(err))
      //taust
    }
    handleFetchUsers();
  }, [users])
  function handleView(users) {
    setfullInfor(users);
    setShowDetails(true);
  }
//Delete
async function handleDelete(id) {
  console.log(id);
  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5044/api/Users/${id}`);
      if (response.status === 200) {
        setUsers((pre) => {
          let list = pre.filter((item) => item.id !== id);
          return list;
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  confirmAlert({
    title: 'Are Your sure',
    message: 'Are you really sure to delete?',
    buttons: [
      {
        label: 'Sure',
        onClick: confirmDelete, // Gọi hàm xóa từ đây
      },
      {
        label: 'None',
        onClick: () => {
          // Không làm gì nếu người dùng chọn Không
        },
      },
    ],
  });
}

//
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post('http://localhost:5044/api/Users/PostAdmin', data)
      if (response.status === 200) {
        setUsers(response.data.data);
        toast.success('👌 Add new employee succcessful', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        reset();
        setBtnInput(!btnInput);
      }
    } catch (error) {
      // console.log(error.response.data);
      }
    
  }
  const onSubmit1 = async (data) => {
    try {
      const response = await axios.put(`http://localhost:5044/api/Users/EditByAdmin/${RowToUpdate}`,data)
      if(response.status===200){
        toast.success('👌 Update employee succcessful', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setUsers(response.data.data);
        setIsUpdate(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function openInput() {
    setBtnInput(true)
  }
  const closeInput = () => {
    setBtnInput(false);
  };
  const closeUpdate = () => {
    setIsUpdate(false);
  };
  async function handleUpdate(item) {
    setRowToUpdate(item.cus_Id);
    setValue('cus_ADD', item.cus_ADD);
    setValue('cus_Phone', item.cus_Phone);
    setIsUpdate(true);
    // console.log(item);
  }
  return (
    <div>
      <h1>Manage Customer</h1>

      <table className='table'>
        <button className='btn btn-primary' onClick={openInput}><i class="fa-solid fa-pen">Add new EMP</i></button>
        {/* <button className='btn btn-primary'></button> */}
        <br /><br /><br />
        <tr>
          <td>Id</td>
          <td>Email</td>
          <td>Address</td>
          <td>Phone</td>
          <td>Action</td>
        </tr>
        <tbody>
          {users.length > 0 && users.map((item, index) => {
            if (item.role !== "User") {
              return (
                <tr key={index}>
                  <td>{item.cus_Id}</td>
                      <td>{item.cus_Email}</td>
                      <td>{item.cus_ADD}</td>
                      <td>{item.cus_Phone}</td>
                  <td>
                      <button style={buttonStyle} onClick={()=>handleDelete(item.cus_Id)}><i class="fa-solid fa-trash" style={{ color: 'red', paddingRight: '10px' }}></i></button>
                      <button style={buttonStyle} onClick={() => handleUpdate(item)}><i class="fa-solid fa-wrench" style={{ color: 'purple', paddingRight: '10px' }}></i></button>
                      <button style={buttonStyle} onClick={() => handleView(item)}><i class="fa-solid fa-eye" style={{ color: 'pink' }}></i></button>
                  </td>
                </tr>
              )
            }
            return null;
          })}
        </tbody>
      </table>
      {/* Form hiển thị thông tin user */}
      {showDetails && fullInfor && (
        <div className="overlay">
          <div className="user-details-form">
            <h2>Customer Details</h2>
            <p>ID: {fullInfor.cus_Id}</p>
            <p>Name: {fullInfor.cus_Name}</p>
            <p>Email: {fullInfor.cus_Email}</p>
            <p>Address: {fullInfor.cus_ADD}</p>
            <p>Phone: {fullInfor.cus_Phone}</p>
            {/* Thêm các thông tin khác cần hiển thị */}
            <button className='close-button' onClick={() => setShowDetails(false)}>Close</button>
          </div>
        </div>
      )}
     {btnInput && (
        <div className="modal-container">
          <div className="modal-content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2>Add new customer</h2>
              <table>
                <tbody className="custom-tbody">
                  <tr>
                    {/* <td><label htmlFor="input1">Name</label></td> */}
                    <td>
                      {/* <input type="text" id="input1" name="Cus_Name" className="custom-input" placeholder="Enter your Name" value={NewUser.Cus_Name}
                    onChange={(e)=>handleInputChange(e)}
                    /> */}
                      <Input
                        label="Emp_Name"
                        id="Emp_Name"
                        type="text"
                        placeholder="Enter Emp Name"
                        register={{ ...register("Cus_Name") }}
                        className="form-control border-0 py-3"
                        errorMessage={errors.Cus_Name?.message}
                      />
                    </td>
                  </tr>
                  <tr>
                    {/* <td><label htmlFor="input2">Email</label></td> */}
                    <td>
                      {/* <input type="text" id="input2" name="Cus_Email" className="custom-input" placeholder="Enter your Email" value={NewUser.Cus_Email} 
                    onChange={(e)=>handleInputChange(e)}
                    /> */}
                      <Input
                        label="Emp_Email"
                        id="Emp_Email"
                        type="text"
                        placeholder="Enter Emp Email"
                        register={{ ...register("Cus_Email") }}
                        className="form-control border-0 py-3"
                        errorMessage={errors.Cus_Email?.message}
                      />
                    </td>
                  </tr>
                  <tr>
                    {/* <td><label htmlFor="input3">Phone</label></td> */}
                    <td>
                      <Input
                        label="Emp_Phone"
                        id="Emp_Phone"
                        type="text"
                        placeholder="Enter Emp Phone"
                        register={{ ...register("Cus_Phone") }}
                        className="form-control border-0 py-3"
                        errorMessage={errors.Cus_Phone?.message}
                      />
                    </td>
                  </tr>
                  <tr>
                    {/* <td><label htmlFor="input4">Address</label></td> */}
                    <td>
                      {/* <input type="text" id="input4" name="Cus_ADD" className="custom-input" placeholder="Enter your Address" value={NewUser.Cus_ADD}
                    onChange={(e)=>handleInputChange(e)}
                    /> */}
                      <Input
                        label="Emp_ADD"
                        id="Emp_ADD"
                        type="text"
                        placeholder="Enter Emp Address"
                        register={{ ...register("Cus_ADD") }}
                        className="form-control border-0 py-3"
                        errorMessage={errors.Cus_ADD?.message}
                      />
                    </td>
                  </tr>
                  <tr>
                    {/* <td><label htmlFor="input5">Password:</label></td> */}
                    <td>
                      {/* <input type="password" id="input5" name="Cus_Password" className="custom-input" placeholder="Enter your Password" value={NewUser.Cus_Password} 
                    onChange={(e)=>handleInputChange(e)}
                    /> */}
                      <Input
                        label="Emp_Password"
                        id="Emp_Password"
                        type="password"
                        placeholder="Enter Emp Password"
                        register={{ ...register("Cus_Password") }}
                        className="form-control border-0 py-3"
                        errorMessage={errors.Cus_Password?.message}
                      />
                    </td>
                  </tr>
                </tbody>

              </table>
              <button className='add-button'>Add</button>
              <button type="button" className="close-button" onClick={closeInput}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}
         {IsUpdate && (
        <div className="modal-container">
          <div className="modal-content">
            <form onSubmit={handleSubmitUpdate(onSubmit1)}>
              <h2>Edit Information's Employee</h2>
              <table>
                <tbody className="custom-tbody">
                
                 
                  <tr>
                    {/* <td><label htmlFor="input3">Phone</label></td> */}
                    <td>
                      <Input
                        label="Emp_Phone"
                        id="Emp_Phone"
                        type="text"
                        placeholder="Enter Emp Phone"
                        register={{ ...registerUpdate("cus_Phone") }}
                        className="form-control border-0 py-3"
                        errorMessage={errorsUpdate.cus_Phone?.message}
                      />
                    </td>
                  </tr>
                  <tr>
                    {/* <td><label htmlFor="input4">Address</label></td> */}
                    <td>
                      {/* <input type="text" id="input4" name="Cus_ADD" className="custom-input" placeholder="Enter your Address" value={NewUser.Cus_ADD}
                    onChange={(e)=>handleInputChange(e)}
                    /> */}
                      <Input
                        label="Emp_ADD"
                        id="Emp_ADD"
                        type="text"
                        placeholder="Enter Emp Address"
                        register={{ ...registerUpdate("cus_ADD") }}
                        className="form-control border-0 py-3"
                        errorMessage={errorsUpdate.cus_ADD?.message}
                      />
                    </td>
                  </tr>
     
                </tbody>

              </table>
              <button className='add-button'>Update</button>
              <button type="button" className="close-button" onClick={closeUpdate}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}


    </div>
  );
}

export default User;