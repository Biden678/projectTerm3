import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function CompanyAddress(props) {

    const {
        handleFetchAddresses, setAddresses, addresses
    } = useContext(AuthContext);
    const [newAddress, setNewAddress] = useState({
        id: 0,
        nameAddress: '',
        id_Area: '',
    });
    const [typeOfAreaList, setTypeOfAreaList] = useState([]);

    const [hasSubmitted, setHasSubmitted] = useState(false);

    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editAddressId, setEditAddressId] = useState(null);


    const [inputErrors, setInputErrors] = useState({
        nameAddress: '', id_Area: ''
    });

    async function handleAddAddress() {
        setHasSubmitted(true);
        try {
            const isValid = validateInputs();
            if (!isValid) {
                return; // Ngừng hàm nếu có lỗi
            }

            // Attempt to add a new insurance contract
            await axios.post("http://localhost:5044/api/Address", newAddress);

            // Fetch the updated list from the server
            const updatedData = await axios.get("http://localhost:5044/api/Address");

            setAddresses(updatedData.data);
            setNewAddress({ id: 0, nameAddress: '', id_Area: '' });

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
            console.log("Error adding new address:", error);
        }
    }

    async function handleEditAddress(id) {
        setInputErrors({ nameAddress: '', id_Area: '' })
        try {
            const response = await axios.get(`http://localhost:5044/api/Address/${id}`);
            const addressToEdit = response.data;

            setNewAddress({
                id: addressToEdit.id,
                nameAddress: addressToEdit.nameAddress,
                id_Area: addressToEdit.id_Area,
            });

            setIsEditing(true);
            setEditAddressId(id);

        } catch (error) {
            console.log("Error fetching address for editing:", error);
        }
    }
    async function handleUpdateAddress() {
        setHasSubmitted(true);

        try {

            const isValid = validateInputs();
            if (!isValid) {
                return; // Ngừng hàm nếu có lỗi
            }


            await axios.put(`http://localhost:5044/api/Address/${editAddressId}`, newAddress);

            const updatedData = await axios.get("http://localhost:5044/api/Address");
            setAddresses(updatedData.data);

            setNewAddress({ id: 0, nameAddress: '', id_Area: '' });

            setIsEditing(false);
            setIsAdding(false);
            setEditAddressId(null);
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
            console.log("Error updating address:", error);
        }
    }

    async function handleDeleteAddress(id) {
        try {
            // Attempt to delete from the server
            await axios.delete(`http://localhost:5044/api/Address/${id}`);

            // Fetch the updated list from the server
            const updatedData = await axios.get("http://localhost:5044/api/Address");
            // Set the state with the updated data from the server
            setAddresses(updatedData.data);

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
            console.log("Error deleting Address:", error);
            // If there's an error, you may want to handle it accordingly
        }
    }

    function handleCancel() {
        setNewAddress({ id: 0, nameAddress: '', id_Area: '' });

        setIsAdding(false);
        setIsEditing(false);
        setHasSubmitted(false);
        setEditAddressId(null);

        setInputErrors({ nameAddress: '', id_Area: '' })
    }
    async function fetchTypeOfAreaList() {
        try {
            const response = await axios.get("http://localhost:5044/api/Area");
            if (response.status === 200) {
                setTypeOfAreaList(response.data);
            }
        } catch (error) {
            console.log("Error fetching Type Of Area:", error);
        }
    }


    function getAreaName(areaId) {
        const area = typeOfAreaList.find((type) => type.id === areaId);
        return area ? area.nameArea : 'N/A'; // If area is not found, you can return a default value like 'N/A'
    }


    const validateInputs = () => {
        let isValid = true;
        const errors = {};

        if (!newAddress.nameAddress.trim()) {
            errors.nameAddress = 'Address Name is required';
            isValid = false;
        } else if (newAddress.nameAddress.length < 2 || newAddress.nameAddress.length > 200) {
            errors.nameAddress = 'Address Name must be between 2 and 200 characters';
            isValid = false;
        } else if (!/^[\p{L}0-9,\/\s]+$/u.test(newAddress.nameAddress)) {
            errors.nameAddress = 'Address Name cannot contain special characters, except for "/" and ","';
            isValid = false;
        }

        if (!newAddress.id_Area) {
            errors.id_Area = 'Please select an area';
            isValid = false;
        }

        // Cập nhật trạng thái lỗi
        setInputErrors(errors);

        // Trả về true nếu không có lỗi, ngược lại trả về false
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        validateInputs();
    }, [
        newAddress.nameAddress,
        newAddress.id_Area,
    ]);


    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    }



    const [searchTerm, setSearchTerm] = useState('');
    const [selectedArea, setSelectedArea] = useState('All');

    // ... other functions ...

    const filterAndPaginate = () => {
        let filteredAddresses = addresses;

        // Filter by search term
        filteredAddresses = filteredAddresses.filter(item =>
            item.nameAddress.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Filter by selected area
        if (selectedArea !== 'All') {
            filteredAddresses = filteredAddresses.filter(item =>
                item.id_Area === parseInt(selectedArea)
            );
        }

        // Sort by area name
        filteredAddresses.sort((a, b) => {
            const areaNameA = getAreaName(a.id_Area).toLowerCase();
            const areaNameB = getAreaName(b.id_Area).toLowerCase();
            return areaNameA.localeCompare(areaNameB);
        });

        return filteredAddresses;
    };

    const filteredAddresses = filterAndPaginate();


    useEffect(() => {
        handleFetchAddresses();
        fetchTypeOfAreaList();
    }, [selectedArea]);



    return (
        <div>
            <h1>Company Addresses
                <span style={{ float: 'right' }}>
                    <button className='btn btn-outline-success' onClick={isAdding || isEditing ? handleCancel : () => setIsAdding(true)}>
                        {isAdding || isEditing ? 'Cancel' : 'Add new'}
                    </button>
                </span>
            </h1>



            {(isAdding || isEditing) && (
                <form className='row'>
                    {isEditing && (
                        <input type="hidden" className="form-control" id="id" value={newAddress.id} onChange={(e) => setNewAddress({ ...newAddress, id: e.target.value })} />
                    )}
                    <div className="mb-3 col-lg-9">
                        <label htmlFor="nameAddress" className="form-label" style={{ float: 'left' }}>
                            Address Name
                        </label>
                        <input
                            type="text"
                            className={`form-control ${hasSubmitted && inputErrors.nameAddress && 'is-invalid'}`}
                            id="nameAddress"
                            value={newAddress.nameAddress}
                            onChange={(e) => setNewAddress({ ...newAddress, nameAddress: e.target.value })}
                        />
                        {hasSubmitted && inputErrors.nameAddress && <div className="invalid-feedback">{inputErrors.nameAddress}</div>}
                    </div>
                    <div className="mb-3 col-lg-3">
                        <label htmlFor="id_Area" className="form-label" style={{ float: 'left' }}>
                            Type Area
                        </label>
                        <select
                            className={`form-select ${hasSubmitted && inputErrors.id_Area && 'is-invalid'}`}
                            id="id_Area"
                            value={newAddress.id_Area}  // Make sure to use id_Area here
                            onChange={(e) => setNewAddress({ ...newAddress, id_Area: e.target.value })}
                        >
                            <option>Choose . . .</option>
                            {typeOfAreaList.map((type) => (
                                <option key={type.id_Area} value={type.id}>
                                    {type.nameArea}
                                </option>
                            ))}
                        </select>
                        {hasSubmitted && inputErrors.id_Area && (
                            <div className="invalid-feedback">{inputErrors.id_Area}</div>
                        )}
                    </div>
                    <button type="button" className="btn btn-primary" onClick={isEditing ? handleUpdateAddress : handleAddAddress}>
                        {isEditing ? 'Update' : 'Submit'}
                    </button>
                </form>
            )}


            <div className='mt-5 row'>
                <div className='col-lg-9'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Search by address'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className='col-lg-3'>
                    <select
                        className="form-select"
                        value={selectedArea}
                        onChange={(e) => setSelectedArea(e.target.value)}
                    >
                        <option value='All'>All</option>
                        {typeOfAreaList.map((type) => (
                            <option key={type.id_Area} value={type.id}>
                                {type.nameArea}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="table-responsive mt-3">
                <table className="table text-nowrap mb-0 align-middle">
                    <thead className="text-dark fs-4">
                        <tr>
                            <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">#</h6>
                            </th>
                            <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Address Name</h6>
                            </th>
                            <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Name Area</h6>
                            </th>
                            <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Action</h6>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredAddresses.length > 0 ? (
                                filteredAddresses?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>
                                            {truncateText(item.nameAddress, 70)}
                                        </td>
                                        <td>{getAreaName(item.id_Area)}</td>
                                        <td>
                                            <button className="btn btn-warning" onClick={() => handleEditAddress(item.id)}>
                                                Edit
                                            </button>
                                            <button className="btn btn-danger" onClick={() => handleDeleteAddress(item.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <p style={{ color: 'red' }}>Chưa có sản phẩm.</p>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CompanyAddress;