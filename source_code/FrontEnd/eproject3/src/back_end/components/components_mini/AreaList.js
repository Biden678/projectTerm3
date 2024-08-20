import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function AreaList(props) {
    const {
        handleFetchAddresses,
        setAddresses,

        handleFetchAreas, setAreas, areas
    } = useContext(AuthContext);

    const [hasSubmitted, setHasSubmitted] = useState(false);



    const [newArea, setNewArea] = useState({ nameArea: '' });
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editAreaId, setEditAreaId] = useState(null);

    const [addressId, setAddressId] = useState([]);



    const [inputErrors, setInputErrors] = useState({
        nameArea: '',
    });

    useEffect(() => {
        handleFetchAreas();
        handleFetchAddresses();
        fetchAreaIds();
    }, []);


    async function fetchAreaIds() {
        try {
            const data = await axios.get("http://localhost:5044/api/Address");
            if (data.status === 200) {
                setAddresses(data.data);
                const areaId = data.data.map(address => address.id_Area);
                console.log("areaId", areaId);
                setAddressId(areaId);
            }
        } catch (error) {
            console.log("Something Wrong:", error);
        }
    }


    const validateInputs = () => {
        let isValid = true;
        const errors = {};

        if (!newArea.nameArea.trim()) {
            errors.nameArea = 'Name Area is required';
            isValid = false;
        } else if (newArea.nameArea.length < 2 || newArea.nameArea.length > 30) {
            errors.nameArea = 'Name Area must be between 2 and 30 characters';
            isValid = false;
        } else if (!/^[a-zA-Z0-9 ]+$/.test(newArea.nameArea)) {
            errors.nameArea = 'Name Area cannot contain special characters';
            isValid = false;
        }

        setInputErrors(errors);

        return isValid;
    };

    const handleCancel = () => {
        setIsAdding(false);
        setIsEditing(false);
        setEditAreaId(null);

        setInputErrors({ nameArea: '' });
        setNewArea({ nameArea: '' });

        setHasSubmitted(false);
    };

    const handleAddArea = async () => {

        setHasSubmitted(true);

        try {
            const isValid = validateInputs();
            if (!isValid) {
                return;
            }

            await axios.post("http://localhost:5044/api/Area", newArea);

            const updatedData = await axios.get("http://localhost:5044/api/Area");
            setAreas(updatedData.data);

            setNewArea({ nameArea: '' });
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
            console.log("Error adding new Area:", error);
        }
    };

    const handleEditArea = (id) => {
        const areaToEdit = areas.find(area => area.id === id);
        setEditAreaId(id);
        setNewArea({ ...newArea, ...areaToEdit });
        setIsEditing(true);
        setInputErrors({ nameArea: '' });

    };

    const handleUpdateArea = async () => {

        setHasSubmitted(true);

        try {
            const isValid = validateInputs();
            if (!isValid) {
                return;
            }

            await axios.put(`http://localhost:5044/api/Area/${editAreaId}`, newArea);

            const updatedData = await axios.get("http://localhost:5044/api/Area");
            setAreas(updatedData.data);

            setEditAreaId(null);
            setNewArea({ nameArea: '' });
            setIsEditing(false);
            setIsAdding(false);
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
            console.log("Error updating Area:", error);
        }
    };

    const handleDeleteArea = async (id) => {
        try {
            await axios.delete(`http://localhost:5044/api/Area/${id}`);

            const updatedData = await axios.get("http://localhost:5044/api/Area");
            setAreas(updatedData.data);

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
            console.log("Error deleting Area:", error);
        }
    };

    useEffect(() => {
        validateInputs();
    }, [
        newArea.nameArea
    ]);

    // function handleCannotDelete(){
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
                                    <input type="hidden" className="form-control" id="barcode" value={newArea.id} onChange={(e) => setNewArea({ ...newArea, id: e.target.value })} />
                                }
                                <div className="mb-3 col-lg-12">
                                    <label htmlFor="nameArea" className="form-label" style={{ float: 'left' }}>
                                        Name Area
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${hasSubmitted && inputErrors.nameArea ? 'is-invalid' : ''}`}
                                        id="nameArea"
                                        value={newArea.nameArea}
                                        onChange={(e) => setNewArea({ ...newArea, nameArea: e.target.value })}
                                    />
                                    {hasSubmitted && inputErrors.nameArea && <div className="invalid-feedback">{inputErrors.nameArea}</div>}
                                </div>
                                <button type="button" className="btn btn-primary" onClick={isEditing ? handleUpdateArea : handleAddArea}>
                                    {isEditing ? 'Update' : 'Submit'}
                                </button>
                            </form>
                        )}

                        <div className="table-responsive mt-3">
                            <table className="table text-nowrap mb-0 align-middle">
                                <thead className="text-dark fs-4">
                                    <tr>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">#</h6>
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
                                    {areas?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.nameArea}</td>
                                            <td>

                                               
                                                <button className="btn btn-warning" onClick={() => handleEditArea(item.id)}>
                                                    Edit
                                                </button> {!addressId.includes(item.id) ? (
                                                    <button
                                                        className='btn btn-danger'
                                                        onClick={() => {
                                                            const shouldDelete = window.confirm('Are You Sure ?');
                                                            if (shouldDelete) {
                                                                handleDeleteArea(item.id);
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

export default AreaList;