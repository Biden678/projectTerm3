import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import '../.././css/style.css';
import { AuthContext } from '../../../contexts/AuthContext';
import { AuthContextClaimDetail } from '../../../contexts/AuthContextClaimDetail';

function WarrantyPolicyCustomer(props) {

    const { claimDetails, handleFetchClaimDetails,handleFetchClaimLists } = useContext(AuthContextClaimDetail);
    const { token, orderDTOs, setOrderDTOs, handleFetchOrderDTOs, } = useContext(AuthContext);
//    orderDTOs, setOrderDTOs, handleFetchOrderDTOs,

        const [newClaim, setNewClaim] = useState({
            cus_Id: '',
            claimNumber: '',
            policyNumber: '',
            policyStartDate: '',
            policyEndDate: '',
            cusName: '',
            placeOfAccident: '',
            dateOfAccident: '',
            insuredAmount: 30000,
            claimableAmount: 15000,
            nameOfBank: '',
            bankAccountNumber: ''

        });

    newClaim.cus_Id = token ? token?.Cus_Id : '';
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const [newClaimList, setNewClaimList] = useState({
        id: 0,
        claimNumber: '',
        policyNumber: '',
        cusName: '',
    });

    
    useEffect(() => {
        handleFetchClaimDetails();
        handleFetchClaimLists();
        handleFetchOrderDTOs();
    }, []);
    useEffect(() => {
        function handleOrders() {
            // Filter orders based on customer ID
            let filteredOrders = orderDTOs.filter(item => item.cus_Id == token?.Cus_id);
            // Store the filtered orders in state

            setOrderDTOs(filteredOrders);
        }
        handleOrders();

    }, [token?.Cus_Id]);

    console.log("orders",orderDTOs);

    const handleAddClaim = async () => {
        try {

            const response = await axios.post("http://localhost:5044/api/ClaimDetail/", newClaim);
            const responseClaimList = await axios.post("http://localhost:5044/api/ClaimList/", newClaimList);




            if (response.status === 200 && responseClaimList.status === 200) {
                // Refresh claim details after successful addition
                handleFetchClaimDetails();
                // Clear the form
                setNewClaim({
                    claimNumber: '',
                    policyNumber: '',
                    policyStartDate: '',
                    policyEndDate: '',
                    cusName: '',
                    placeOfAccident: '',
                    dateOfAccident: '',
                    insuredAmount: '',
                    claimableAmount: '',
                    nameOfBank: '',
                    bankAccountNumber: ''
                });
                setNewClaimList({
                    id: 0,
                    claimNumber: '',
                    policyNumber: '',
                    cusName: '',
                });


            }
        } catch (error) {
            console.log("Error adding claim:", error);
        }
    };

    const handleEditClaim = (index) => {
        setIsEditing(true);
        setEditIndex(index);
        setNewClaim(claimDetails[index]);

    };

    const handleUpdateClaim = async () => {
        try {
            const response = await axios.put(`http://localhost:5044/api/ClaimDetail/`, newClaim);
            if (response.status === 200) {
                // Refresh claim details after successful update
                handleFetchClaimDetails();
                // Clear the form and exit edit mode
                setNewClaim({
                    claimNumber: '',
                    policyNumber: '',
                    policyStartDate: '',
                    policyEndDate: '',
                    cusName: '',
                    placeOfAccident: '',
                    dateOfAccident: '',
                    insuredAmount: '',
                    claimableAmount: '',
                    nameOfBank: '',
                    bankAccountNumber: ''
                });
                setIsEditing(false);
                setEditIndex(null);
            }
        } catch (error) {
            console.log("Error updating claim:", error);
        }
    };
    const handleDeleteClaim = async (index) => {
        try {
            const response = await axios.delete(`http://localhost:5044/api/ClaimDetail/${claimDetails[index].id}`);
            if (response.status === 200) {
                // Refresh claim details after successful deletion
                handleFetchClaimDetails();
            }
        } catch (error) {
            console.log("Error deleting claim:", error);
        }
    };
    const handleCancelAddClaim = () => {
        // Clear the form and hide it on cancel
        setNewClaim({
            claimNumber: '',
            policyNumber: '',
            policyStartDate: '',
            policyEndDate: '',
            cusName: '',
            placeOfAccident: '',
            dateOfAccident: '',
            insuredAmount: '',
            claimableAmount: '',
            nameOfBank: '',
            bankAccountNumber: ''
        });
        setNewClaimList({
            id: 0,
            claimNumber: '',
            policyNumber: '',
            cusName: '',
        });
    };

    const randomClaimNumber = 'POL' + Math.floor(Math.random() * 100000);
    newClaim.claimNumber = randomClaimNumber;
    newClaimList.claimNumber = randomClaimNumber;

    const randomPolicyNumber = 'POC' + Math.floor(Math.random() * 1000);
    newClaim.policyNumber = randomPolicyNumber; newClaimList.policyNumber = randomPolicyNumber;


    return (
        <div>
            <div className="add-claim-form mt-3">
                {

                    <form className="claim-form">
                        <div className="form-group">
                            <h1 className='warranty'>WARRANTY POLICY APPLICATION</h1>
                        </div>

                        <div className="form-group">
                            <label htmlFor="cusName">Customer's Name:</label>
                            <input
                                type="text"
                                id="cusName"
                                name="cusName"
                                value={newClaim.cusName}
                                onChange={(e) => {
                                    setNewClaim({ ...newClaim, cusName: e.target.value });
                                    setNewClaimList({ ...newClaimList, cusName: e.target.value });
                                }
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="policyStartDate">Policy Start Date:</label>
                            <input
                                type="date"
                                id="policyStartDate"
                                name="policyStartDate"
                                value={newClaim.policyStartDate}
                                onChange={(e) =>
                                    setNewClaim({ ...newClaim, policyStartDate: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="policyEndDate">Policy End Date:</label>
                            <input
                                type="date"
                                id="policyEndDate"
                                name="policyEndDate"
                                value={newClaim.policyEndDate}
                                onChange={(e) =>
                                    setNewClaim({ ...newClaim, policyEndDate: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="placeOfAccident">Place Of Accident:</label>
                            <input
                                type="text"
                                id="placeOfAccident"
                                name="placeOfAccident"
                                value={newClaim.placeOfAccident}
                                onChange={(e) =>
                                    setNewClaim({ ...newClaim, placeOfAccident: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateOfAccident">Date Of Accident:</label>
                            <input
                                type="date"
                                id="dateOfAccident"
                                name="dateOfAccident"
                                value={newClaim.dateOfAccident}
                                onChange={(e) =>
                                    setNewClaim({ ...newClaim, dateOfAccident: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="insuredAmount">InsuredAmount:</label>
                            <input
                                type="number"
                                id="insuredAmount"
                                name="insuredAmount"
                                value={newClaim.insuredAmount}
                                readOnly
                                onChange={(e) =>
                                    setNewClaim({ ...newClaim, insuredAmount: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="claimableAmount">ClaimableAmount:</label>
                            <input
                                type="number"
                                id="claimableAmount"
                                name="claimableAmount"
                                value={newClaim.claimableAmount}
                                readOnly
                                onChange={(e) =>
                                    setNewClaim({ ...newClaim, claimableAmount: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nameOfBank">Name Of Bank:</label>
                            <input
                                type="text"
                                id="nameOfBank"
                                name="nameOfBank"
                                value={newClaim.nameOfBank}
                                onChange={(e) =>
                                    setNewClaim({ ...newClaim, nameOfBank: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bankAccountNumber">Bank Account Number:</label>
                            <input
                                type="number"
                                id="bankAccountNumber"
                                name="bankAccountNumber"
                                value={newClaim.bankAccountNumber}
                                onChange={(e) =>
                                    setNewClaim({ ...newClaim, bankAccountNumber: e.target.value })
                                }
                            />
                        </div>
                        {/* Add similar form-group elements for the other fields */}
                        {/* ... */}
                        <div className="form-actions">
                            {isEditing ? (
                                <>
                                    <button type="button" onClick={handleUpdateClaim}>
                                        Update Claim
                                    </button>

                                </>
                            ) : (
                                <>
                                    <button type="button" className="button-91" onClick={handleAddClaim}>
                                        Gửi đơn bảo hành
                                    </button>
                                    <button type="button" className="button-91" onClick={handleCancelAddClaim}>
                                        Cancel
                                    </button>




                                </>


                            )}
                        </div>
                    </form>
                }
            </div>
            {claimDetails?.length > 0 ? (
                <div className="list-container mt-3">

                </div>
            ) : (
                <p style={{ color: 'red' }}>Chưa có sản phẩm.</p>
            )}
            {/* Form to add a new claim */}

        </div>
    );
}

export default WarrantyPolicyCustomer;
