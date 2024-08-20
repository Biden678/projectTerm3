import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import '.././assets/css/duc.css';
import { AuthContextClaimDetail } from '../../contexts/AuthContextClaimDetail';

function WarrantyPolicyBE(props) {
    const { token, claimLists, setClaimLists, handleFetchClaimLists } = useContext(AuthContextClaimDetail);
    useEffect(() => {
        handleFetchClaimLists();
    }, []);
    return (
        <div>
            {claimLists?.length > 0 ? (
                <div className="list-container mt-3">
                    {claimLists.map((item, index) => (
                        <div key={index} className="claim-item row">
                            <p className='col-lg-6'>ClaimNumber: {item.claimNumber}</p>
                            <p className='col-lg-6'>PolicyNumber: {item.policyNumber}</p>
                            <p className='col-lg-6'>CusName: {item.cusName}</p>
                            <a className='col-lg-6' href={`/DetailsWarrantyAdmin/${item.claimNumber}`}>
                                <p><button className="button-91">Details</button></p>
                            </a>

                            <hr />
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ color: 'red' }}>No Warranty Policy here.</p>
            )}
            {/* Form to add a new claim */}
        </div>
    );
}

export default WarrantyPolicyBE;