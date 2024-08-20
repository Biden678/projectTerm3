import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./User.css"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
// import Modal from 'react-modal';
function User(props) {
  // npm install react-confirm-alert
  //npm install react-modal
  const [users, setUsers] = useState([])
  const [fullInfor, setfullInfor] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [btnInput, setBtnInput] = useState(false);
  const [NewUser, setNewUser] = useState({
    cus_Name: "",
    cus_Password: "",
    cus_Email: "",
    cus_Phone: "",
    cus_ADD: "",
  })
  const [IsUpdate, setIdUpdate] = useState(false)
  const [RowToUpdate, setRowToUpdate] = useState(null)
  const buttonStyle = {
    border: 'none',
    outline: 'none',
    background: 'none',
    paddingRight:'10px',
  };
  const buttonStylePen = {
    border: 'none',
    outline: 'none',
    background: 'none',
    paddingRight:'1000px',
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
  }, [])
  function handleView(users) {
    setfullInfor(users);
    setShowDetails(true);
  }
  
  function openInput() {
    setBtnInput(true)
  }
  const closeInput = () => {
    setBtnInput(false);
  };  
  const closeUpdate = () => {
    setIdUpdate(!IsUpdate);
  };  
  function handleInputChange(e,id) {
    const { name, value } = e.target;
    setNewUser({ ...NewUser, [name]: value });

    setUsers(pre=>{
      const result = pre.map(item => {
        if (item.id === id) {
          return { ...item, [name]: value };
        }
        return item;
      });

      return result;
    })
    

  }
  const handleSubmitUpdate = (id)=>{
axios.put(`http://localhost:5044/api/Users/${id}`,NewUser)
    .then(res=>{
      if(res.status == 200){
        setIdUpdate(false)
        setUsers(pre=>{
         let result = pre.map(item=>item.cus_Id==id?NewUser:item);
         return result;
        })
        setNewUser({
          cus_Name: "",
          cus_Password: "",
          cus_Email: "",
          cus_Phone: "",
          cus_ADD: "",
        })
      }
    })
  }
  async function onSubmit(e) {
    e.prevent.Default();
    // if (IsUpdate && RowToUpdate) {
    //   try {
    //     console.log(RowToUpdate);
    //     const response = await axios.put('http://localhost:5044/api/Users/PostByAdmin', NewUser)
    //     if (response.status === 200) {
    //       setUsers(response.data.data)
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // else {
      try {
        const response = await axios.post('http://localhost:5044/api/Users/PostByAdmin', NewUser)
        if (response.status === 200) {
          setNewUser(response.data.data);
        }
      } catch (error) {
        console.log(error.response);
      // }
    }
  }
  //   Update
  async function handleUpdate(item) {
    // console.log(item);
    setRowToUpdate(item.cus_Id);
setNewUser(item)
    setIdUpdate(!IsUpdate);
  }
  // console.log(IsUpdate);
  return (
    <div id='apps'>
      <h1>Manage Customer</h1>
      {/* <button style={buttonStylePen} onClick={openInput}><i class="fa-solid fa-pen" style={{ color: 'green'}}></i></button> */}
      <table className='table'>
        <tr>
          <td>Id</td>
          <td>Email</td>
          <td>Address</td>
          <td>Phone</td>
          <td>Action</td>
        </tr>
        <tbody>
          {users.length > 0 && users.map((item, index) => {
            if (item.role === "User") {
              return (
                <tr key={index}>
                  <td>{item.cus_Id}</td>

                  {IsUpdate && RowToUpdate === item.cus_Id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          id="input1" className="read-only-input"
                          name="cus_Email"
                          placeholder="Enter your Email"
                          value={item.cus_Email}
                          onChange={(e) => handleInputChange(e,item.cus_Id)} readOnly />
                      </td>
                      <td>
                        <input
                          type="text"
                          id="input1"
                          name="cus_ADD"
                          placeholder="Enter your Address"
                          value={NewUser.cus_ADD}
                          onChange={(e) => handleInputChange(e,item.cus_Id)} />
                      </td>
                      <td>
                        <input
                          type="text"
                          id="input1"
                          name="cus_Phone"
                          placeholder="Enter your Phone"
                          value={NewUser.cus_Phone}
                          onChange={(e) => handleInputChange(e,item.cus_Id)} />
                      </td>

                    </>

                  ) : (
                    <>

                      <td>{item.cus_Email}</td>
                      <td>{item.cus_ADD}</td>
                      <td>{item.cus_Phone}</td>
                    </>
                  )}
                  <td>
                    
                    {IsUpdate?(<>
                    <button style={buttonStyle} onClick={() => handleSubmitUpdate(item.cus_Id)}><i class="fa-solid fa-check"></i></button>
                    <button style={buttonStyle} onClick={closeUpdate}><i class="fa-solid fa-x"></i></button>
                    </>
                      )
                    :(
                      <>

                    <button style={buttonStyle} onClick={() => handleView(item)}><i class="fa-solid fa-eye" style={{ color: 'pink' }}></i></button>
                      </>
                    )
                    }
                    
                    
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
            <form onSubmit={onSubmit}>
              <h2>Add new customer</h2>
              <table>
                <tbody className="custom-tbody">
                  <tr>
                    <td><label htmlFor="input1">Name</label></td>
                    <td><input type="text" id="input1" name="Cus_Name" className="custom-input" placeholder="Enter your Name" value={NewUser.Cus_Name}
                      onChange={(e) => handleInputChange(e)}
                    /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor="input2">Email</label></td>
                    <td><input type="text" id="input2" name="Cus_Email" className="custom-input" placeholder="Enter your Email" value={NewUser.Cus_Email}
                      onChange={(e) => handleInputChange(e)}
                    /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor="input3">Phone</label></td>
                    <td><input type="text" id="input3" name="Cus_Phone" className="custom-input" placeholder="Enter your Phone" value={NewUser.Cus_Phone}
                      onChange={(e) => handleInputChange(e)}
                    /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor="input4">Address</label></td>
                    <td><input type="text" id="input4" name="Cus_ADD" className="custom-input" placeholder="Enter your Address" value={NewUser.Cus_ADD}
                      onChange={(e) => handleInputChange(e)}
                    /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor="input5">Password:</label></td>
                    <td><input type="password" id="input5" name="Cus_Password" className="custom-input" placeholder="Enter your Password" value={NewUser.Cus_Password}
                      onChange={(e) => handleInputChange(e)}

                    /></td>
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
    </div>
  );
}

export default User;