import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Input from '../../front_end/Input';
function AdminContact(props) {
    //npm i react-google-recaptcha
    const [dataContact,setDataContact] = useState([])
    const [selectedContact, setSelectedContact] = useState(null);
    // const [replyText, setReplyText] = useState({
    //     :""
    // });
    const schema = yup.object({
      HtmlContent: yup.string().required('Your Reply is required'),
  });
  const { handleSubmit, register, formState: { errors }, reset } = useForm({
      resolver: yupResolver(schema)
  })
    const [btnInput, setBtnInput] = useState(false);
    const buttonStyle = {
        border: 'none',
        outline: 'none',
        background: 'none',
      };
    useEffect(()=>{
        async function handleFetchContacts(){
            await axios.get('http://localhost:5044/api/Contact')
            .then(res=>{
                if(res.status===200){
                    setDataContact(res.data.data)
                             //vi` trong config co dinh nghia~ r
                            //  console.log(users);
                            // console.log(dataContact);
                }
            })
            .catch(err=>console.log(err))
            //taust
        }
        handleFetchContacts();
    },[])
    const handleReply = (contact) => {
        setSelectedContact(contact);
        setBtnInput(true);
      };
      const closeInput = () => {
        setBtnInput(false);
        setSelectedContact(null);
      };
    // const handleReply = async (id)=>{
    //     try {
    //         const response = await axios.post(`/api/yourControllerName/${id}/respond`, {
    //             Tomail: 'example@email.com', // Thay thế bằng địa chỉ email cần gửi
    //             Subject: 'We have received your email. We appreciate your feedback.',
    //             HtmlContent: 'Your HTML content here', // Thay thế bằng nội dung HTML cần gửi
    //           });
        
    //           // Xử lý dữ liệu nếu cần
    //           console.log(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    async function handleDelete(id) {
        console.log(id);
        const confirmDelete = async () => {
          try {
            const response = await axios.delete(`http://localhost:5044/api/Contact/${id}`);
            if (response.status === 200) {
              setDataContact((pre) => {
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
      const onSubmit = async (data) => {
        try {
          if (data && selectedContact) {
            const dataForAPI = {
                id: selectedContact.id,
                Tomail: selectedContact.email,
                Subject: "We have received your email. We appreciate your feedback.",
                HtmlContent: data.HtmlContent
              };
            const response = await axios.post(
                `http://localhost:5044/api/Contact/respond?id=${selectedContact.id}`, dataForAPI
              );
              
            if (response.status === 200) {
              console.log("success");
              // Sau khi gửi xong, đóng modal
              closeInput();
              setDataContact((pre) => {
                let list = pre.filter((item) => item.id !== selectedContact.id);
                return list;
              });
              reset();
              toast('👌 Reply Feedback is succcessful', {
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
            console.log(selectedContact.email);
          }
        } catch (error) {
          console.log(error.response.data.errors);
        }
      };
    return (
        <div>
             <h1>Contact</h1>
           
           <table className='table'>
    <tr>
    <td>Id</td>
    <td>Email</td>
    <td>Subject</td>
    <td>Message</td>
    <td>Action</td>
    </tr>
    <tbody>
{dataContact.length>0 &&dataContact.map((item,index)=>{
    return(
        <tr key={index}>
            <td>{item.id}</td>
            <td>{item.email}</td>
            <td>{item.subject}</td>
            <td>{item.title}</td>
            <td>
                    <button style={buttonStyle} onClick={()=>handleDelete(item.id)}><i class="fa-solid fa-trash" style={{color:'red',paddingRight:'10px'}}></i></button>
                    <button style={buttonStyle} onClick={()=>handleReply(item)}> <i class="fa-solid fa-reply" style={{color:'purple',paddingRight:'10px'}}></i></button>
                    </td>
       </tr>
    )
})}
    </tbody>
    </table>
    {btnInput && selectedContact && (
        <div className="modal-container">   
          <div className="modal-content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2>Reply to Contact #{selectedContact.id}</h2>
              <table>
                <tbody className="custom-tbody">
                  {/* Hiển thị các thông tin cũ tại đây */}
                  <tr>
                    <td>Email:</td>
                    <td>{selectedContact.email}</td>
                  </tr>
                  <tr>
                    <td>Title:</td>
                    <td>{selectedContact.subject}</td>
                  </tr>
                  <tr>
                    <td>Mesage:</td>
                    <td>{selectedContact.title}</td>
                  </tr>
                  <tr>
                    <td><label htmlFor="replyInput">Reply:</label></td>
                    <td>
                      {/* <input
                        type="text"
                        id="replyInput"
                        name="HtmlContent"
                        className="custom-input"
                        placeholder="Enter your reply"
                        value={replyText.HtmlContent}
                        onChange={(e) =>handleChangeInput(e)}
                      /> */}
                       <Input
                        // label="HtmlContent"
                        id="HtmlContent"
                        type="text"
                        placeholder="Enter Your Reply"
                        register={{ ...register("HtmlContent") }}
                        className="form-control border-0 py-3"
                        errorMessage={errors.HtmlContent?.message}
                    />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="add-button" type='submit'>Reply</button>
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

export default AdminContact;