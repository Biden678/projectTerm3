import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';

function OrderDetail(props) {
    const { navigate, orders, handleFetchOrders } = useContext(AuthContext);
    const { code_Order_Params } = useParams();

    console.log("code_Order_Params", code_Order_Params);



    useEffect(() => {
        handleFetchOrders();
        if (!code_Order_Params) {
            navigate('/')
        }
        console.log("orders", orders);
    }, []);

    const filteredOrders = orders.filter(item => item.code_Order == code_Order_Params);



    console.log("filteredOrders", filteredOrders);
    return (
        <div>
            <div className='m-5 row'>
                {filteredOrders.length > 0 &&
                    filteredOrders.map((item, index) => (
                        <div className="col-lg-12" key={index}>
                            <div className="card">
                                <div className="card-body row">
                                    <h5 className="card-title fw-semibold mb-3">Code Order # : {item.code_Order}</h5>

                                    <p className="card-text col-lg-6">
                                        <strong>Contract Name :</strong> {item.type_Insurance}
                                    </p>
                                    <p className="card-text col-lg-6">
                                        <strong>Number Of Seats :</strong> {item.number_Of_Seats}
                                    </p>
                                    <p className="card-text col-lg-6">
                                        <strong>Payload:</strong> {item.payload}
                                    </p>
                                    <p className="card-text col-lg-6">
                                        <strong>License Plates :</strong> {item.licensePlates}
                                    </p>
                                    <p className="card-text col-lg-6">
                                        <strong>Chassis Number :</strong> {item.chassisNumber}
                                    </p>
                                    <p className="card-text col-lg-6">
                                        <strong>Engine Number :</strong> {item.engineNumber}
                                    </p>
                                    <p className="card-text col-lg-6">
                                        <strong>Vat :</strong> {item.vat}
                                    </p>
                                    <p className="card-text col-lg-6">
                                        <strong>Price :</strong> {item.price}
                                    </p>

                                    <hr />

                                    <p className="card-text col-lg-6">
                                        <strong>Date From:</strong> {item.dateFrom}
                                    </p>
                                    <p className="card-text col-lg-6">
                                        <strong>Date To:</strong> {item.dateTo}
                                    </p>
                                    <p className="card-text col-lg-6">
                                        <strong>Duration :</strong> {item.duration}
                                    </p>

                                    <hr />

                                    <p className="card-text col-lg-6">
                                        <strong>Name Of Vehicle Owner:</strong> {item.name_Of_Vehicle_Owner}
                                    </p>
                                    <p className="card-text col-lg-6">
                                        <strong>Vehicle Owner Address :</strong> {item.vehicle_Owner_Address}
                                    </p>
                                    <p className="card-text col-lg-6">
                                        <strong>Phone :</strong> {item.phone}
                                    </p>
                                    <p className="card-text col-lg-6">
                                        <strong>ID/CCCD:</strong> {item.cmnd}
                                    </p>
                                    <p className="card-text col-lg-6">
                                        <strong>Tax Code:</strong> {item.vehicle_Owner_Tax_Code}
                                    </p>

                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default OrderDetail;