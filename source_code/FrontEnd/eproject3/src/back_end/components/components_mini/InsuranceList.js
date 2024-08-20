import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { toast } from 'react-toastify';

function InsuranceList(props) {

    const {
        handleFetchProducts,
        setProducts,

        handleFetchInsurances,
        insurances,
        setInsurances
    } = useContext(AuthContext);

    const [hasSubmitted, setHasSubmitted] = useState(false);


    const [newInsurance, setNewInsurance] = useState({ barcode: '', type: '', title: '', description: '' });
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editInsuranceId, setEditInsuranceId] = useState(null);
    const [productsIds, setProductsIds] = useState([]);


    // bắt value
    const [inputErrors, setInputErrors] = useState({
        type: '', title: '', description: ''
    });




    async function handleDeleteInsurance(id) {
        // console.log("id", id);

        try {
            // Attempt to delete from the server
            await axios.delete(`http://localhost:5044/api/Type_Insurance/${id}`);

            // Fetch the updated list from the server
            const updatedData = await axios.get("http://localhost:5044/api/Type_Insurance");
            // Set the state with the updated data from the server
            setInsurances(updatedData.data);

            toast.success('🦄 DELETED SUCCESS !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });


        } catch (error) {
            console.log("Error deleting insurance:", error);
            // If there's an error, you may want to handle it accordingly
        }
    }

    async function handleAddInsurance() {

        setHasSubmitted(true);


        try {
            const isValid = validateInputs();
            if (!isValid) {
                return; // Ngừng hàm nếu có lỗi
            }

            console.log("newInsurance", newInsurance);

            // Attempt to add a new insurance contract
            await axios.post("http://localhost:5044/api/Type_Insurance", newInsurance);

            // Fetch the updated list from the server
            const updatedData = await axios.get("http://localhost:5044/api/Type_Insurance");
            // Set the state with the updated data from the server
            setInsurances(updatedData.data);

            // Clear the form after successful addition
            setNewInsurance({ barcode: '', type: '', title: '', description: '' });

            // Toggle back to the list view
            setIsAdding(false);
            setIsEditing(false);
            setHasSubmitted(false);

            toast.success('🦄 ADDED SUCCESS !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });


        } catch (error) {
            console.log("Error adding new insurance:", error);
            // If there's an error, you may want to handle it accordingly
        }
    }

    async function handleEditInsurance(id) {
        try {
            const response = await axios.get(`http://localhost:5044/api/Type_Insurance/${id}`);
            const insuranceToEdit = response.data;
            // Set the form fields with the details for editing
            setNewInsurance({
                id_Type_Insurance: insuranceToEdit.id_Type_Insurance, // Convert barcode to a string
                type: insuranceToEdit.type,
                title: insuranceToEdit.title ? insuranceToEdit.title : '',
                description: insuranceToEdit.description ? insuranceToEdit.description : ''
            });

            // Set the edit mode and the insurance ID to be edited
            setIsEditing(true);
            setEditInsuranceId(id);
        } catch (error) {
            console.log("Error fetching insurance for editing:", error);
        }
    }


    async function handleUpdateInsurance() {

        setHasSubmitted(true);

        try {
            const isValid = validateInputs();
            if (!isValid) {
                return; // Ngừng hàm nếu có lỗi
            }


            // Log the payload
            // console.log('Update Payload:', newInsurance);

            // Attempt to update the insurance contract
            await axios.put(`http://localhost:5044/api/Type_Insurance/${editInsuranceId}`, newInsurance);

            // Fetch the updated list from the server
            const updatedData = await axios.get("http://localhost:5044/api/Type_Insurance");
            // Set the state with the updated data from the server
            setInsurances(updatedData.data);

            // Clear the form after successful update
            setNewInsurance(prevState => ({ ...prevState, barcode: '', type: '', title: '', description: '' }));

            // Exit edit mode
            setIsEditing(false);
            setIsAdding(false);
            setEditInsuranceId(null);
            setHasSubmitted(false);

            toast.success('🦄 UPDATED SUCCESS !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });


        } catch (error) {
            console.log("Error updating insurance:", error);
            // If there's an error, you may want to handle it accordingly
        }
    }




    function handleCancel() {
        // Clear the form fields
        setNewInsurance({ barcode: '', type: '', title: '', description: '' });

        // Toggle back to the list view
        setIsAdding(false);
        setIsEditing(false);
        setEditInsuranceId(null);

        setInputErrors({ barcode: '', type: '', title: '', description: '' })

        setHasSubmitted(false);

    }

    useEffect(() => {
        handleFetchProducts();
        handleFetchInsurances();
        fetchServiceIds(); // Fetch service ids when the component mounts
    }, []);

    async function fetchServiceIds() {
        try {
            const data = await axios.get("http://localhost:5044/api/Product");
            if (data.status === 200) {
                setProducts(data.data);
                const serviceIds = data.data.map(service => service.id_Type_Insurance);
                setProductsIds(serviceIds);
            }
        } catch (error) {
            console.log("Something Wrong:", error);
        }
    }

    const validateInputs = () => {
        const errors = {};

        // Kiểm tra và cập nhật lỗi cho mỗi trường

        if (!newInsurance.type) {
            errors.type = 'Please enter Name Service';
        } else {
            // Kiểm tra độ dài và ký tự đặc biệt cho type
            const regexType = /^[\w\d\s\(\)\-]{2,50}$/;
            if (!regexType.test(newInsurance.type)) {
                errors.type = 'Name Service must be 2 to 50 characters and can only contain letters, numbers, spaces, "-", "(", and ")"';
            }
        }

        // Validate title
        if (!newInsurance.title) {
            errors.title = 'Please enter Title';
        } else {
            const regexTitle = /^[\w\d\s.,()\-]{2,500}$/;
            if (!regexTitle.test(newInsurance.title)) {
                errors.title = 'Title must be 2 to 500 characters and can only contain letters, numbers, spaces, commas, periods, "-", "(", and ")"';
            }
        }


        // Validate description
        if (!newInsurance.description) {
            errors.description = 'Please enter Description';
        } else {
            const regexDescription = /^[a-zA-Z0-9\s\n\-,:\/.()]{2,1000}$/;
            if (!regexDescription.test(newInsurance.description)) {
                errors.description = 'Description must be 2 to 1000 characters and can only contain letters, numbers, spaces, newlines, and the following special characters: -, :, /, ., (, )';
            }
        }



        // Cập nhật trạng thái lỗi
        setInputErrors(errors);

        // Trả về true nếu không có lỗi, ngược lại trả về false
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        validateInputs();
    }, [
        newInsurance.type
    ]);

    // function handleCannotDelete() {
    //     toast.error('NO NO! CAN NOT DELETE OK !', {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //     });
    // }

    async function handleDetailInsurance(id) {
        try {
            const response = await axios.get(`http://localhost:5044/api/Type_Insurance/${id}`);
            const insuranceDetails = response.data;

            // Display detailed information in a toast on the left side
            toast(
                <div>
                    <h1>{insuranceDetails.type}</h1>
                    <hr />
                    <strong style={{ color: 'blue' }}>Product Description : </strong>
                    <p>{insuranceDetails.title}</p>
                    <strong style={{ color: 'blue' }}>Customer benefits : </strong>
                    <p>{insuranceDetails.description}</p>
                </div>,
                {
                    position: "top-left",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    style: {
                        width: '500px',
                        height: '90vh',
                    },
                }
            );
        } catch (error) {
            console.log("Error fetching insurance details:", error);
        }
    }


    return (
        <div>
            <div className="col-lg-12 d-flex align-items-stretch">
                <div className="card w-100">
                    <button className='btn btn-outline-success' onClick={isAdding || isEditing ? handleCancel : () => setIsAdding(true)}>
                        {isAdding || isEditing ? 'Cancel' : 'Add new'}
                    </button>
                    <div className="card-body p-4">

                        <h5 className="card-title fw-semibold mb-4">Motorcycle Insurance Contract Tables</h5>

                        {(isAdding || isEditing) && (
                            <form>
                                {isEditing &&
                                    <input type="hidden" className="form-control" id="barcode" value={newInsurance.barcode} onChange={(e) => setNewInsurance({ ...newInsurance, barcode: e.target.value })} />
                                }
                                <div className="mb-3 row">

                                    <div className="mb-3 col-lg-4">
                                        <label htmlFor="name_Service" className="form-label" style={{ float: 'left' }}>
                                            Name Service
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${hasSubmitted && inputErrors.type && 'is-invalid'}`}
                                            id="type"
                                            value={newInsurance.type}
                                            onChange={(e) => setNewInsurance({ ...newInsurance, type: e.target.value })}
                                        />
                                        {hasSubmitted && inputErrors.type && <div className="invalid-feedback">{inputErrors.type}</div>}
                                    </div>

                                    {/* Title input */}
                                    <div className="mb-3 col-lg-8">
                                        <label htmlFor="title" className="form-label" style={{ float: 'left' }}>
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${hasSubmitted && inputErrors.title && 'is-invalid'}`}
                                            id="title"
                                            value={newInsurance.title}
                                            onChange={(e) => setNewInsurance({ ...newInsurance, title: e.target.value })}
                                        />
                                        {hasSubmitted && inputErrors.title && <div className="invalid-feedback">{inputErrors.title}</div>}
                                        <div style={{ textAlign: 'right', color: 'gray' }}>
                                            {newInsurance.title.length}/500
                                        </div>
                                    </div>

                                    <div className="mb-3 col-lg-12">
                                        <label htmlFor="description" className="form-label" style={{ float: 'left' }}>
                                            Description
                                        </label>
                                        <textarea
                                            className={`form-control ${hasSubmitted && inputErrors.description && 'is-invalid'}`}
                                            id="description"
                                            value={newInsurance.description}
                                            onChange={(e) => setNewInsurance({ ...newInsurance, description: e.target.value })}
                                            maxLength={1000}
                                            rows={7} // Set the number of visible rows
                                        />
                                        {hasSubmitted && inputErrors.description && <div className="invalid-feedback">{inputErrors.description}</div>}
                                        <div style={{ textAlign: 'right', color: 'gray' }}>
                                            {newInsurance.description.length}/1000
                                        </div>
                                    </div>


                                </div>
                                <button type="button" className="btn btn-primary" onClick={isEditing ? handleUpdateInsurance : handleAddInsurance}>
                                    {isEditing ? 'Update' : 'Submit'}
                                </button>
                            </form>
                        )}

                        <div className="table-responsive mt-3">
                            <table className="table text-nowrap mb-0 align-middle">
                                <thead className="text-dark fs-4">
                                    <tr>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Insurance #</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Type Of Insurance</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Action</h6>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {insurances?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.id_Type_Insurance}</td>
                                            <td>{item.type}</td>
                                            <td>
                                                

                                                <button className='btn btn-warning ms-2' onClick={() => handleEditInsurance(item.id_Type_Insurance)}>
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-info ms-2"
                                                    onClick={() => handleDetailInsurance(item.id_Type_Insurance)}
                                                >
                                                    Detail
                                                </button> {!productsIds.includes(item.id_Type_Insurance) ? (
                                                    <button
                                                        className='btn btn-danger'
                                                        onClick={() => {
                                                            const shouldDelete = window.confirm('Are You Sure ?');
                                                            if (shouldDelete) {
                                                                handleDeleteInsurance(item.id_Type_Insurance);
                                                                handleCancel();
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                ) : ''
                                                }

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InsuranceList;
