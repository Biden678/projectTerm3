import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from 'jspdf';

function InsuranceSummary(props) {
    const { navigate, newOrder, setNewOrder } = useContext(AuthContext);

    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const printInvoice = () => {
        const doc = new jsPDF();


        // Set font style
        doc.setFont("helvetica", "normal");

        // Add content to the invoice
        doc.setFontSize(24);
        doc.text('Invoice', 15, 15);

        doc.setFontSize(18);
        doc.text('-------------------------------------------------------------------------------------', 15, 20);

        doc.setFontSize(24);
        doc.text(`Insurance: ${newOrder.type_Insurance}`, 15, 30);

        // Add details of the invoice
        doc.setFontSize(16);
        doc.text(`Number Of Seats`, 15, 40);
        doc.text(`: ${newOrder.number_Of_Seats}`, 100, 40);

        doc.text(`Payload`, 15, 50);
        doc.text(`: ${newOrder.payload}`, 100, 50);

        doc.text(`License Plates`, 15, 60);
        doc.text(`: ${newOrder.licensePlates ? newOrder.licensePlates : 'None'}`, 100, 60);

        doc.text(`Chassis Number`, 15, 70);
        doc.text(`: ${newOrder.chassisNumber}`, 100, 70);

        doc.text(`Engine Number`, 15, 80);
        doc.text(`: ${newOrder.engineNumber}`, 100, 80);

        doc.text(`VAT`, 15, 90);
        doc.text(`: ${newOrder.vat}%`, 100, 90);

        doc.text(`Price`, 15, 100);
        doc.text(`: ${newOrder.price}$`, 100, 100);

        doc.text(`Insurance period from`, 15, 110);
        doc.text(`: ${newOrder.dateFrom}`, 100, 110);

        doc.text(`Insurance period to`, 15, 120);
        doc.text(`: ${newOrder.dateTo}`, 100, 120);

        doc.text(`Duration`, 15, 130);
        doc.text(`: ${newOrder.duration}`, 100, 130);
       



        doc.setFontSize(24);
        doc.text(`Vehicle Owner: ${newOrder.name_Of_Vehicle_Owner}`, 15, 150);

        doc.setFontSize(16);
        doc.text(`Vehicle Owner Address`, 15, 160);
        doc.text(`: ${newOrder.vehicle_Owner_Address}`, 100, 160);

        doc.text(`Claimant Phone Number`, 15, 170);
        doc.text(`: ${newOrder.phone ? newOrder.phone : 'None'}`, 100, 170);
        
        doc.text(`ID/CCCD`, 15, 180);
        doc.text(`: ${newOrder.cmnd ? newOrder.cmnd : 'None'}`, 100, 180);
        
        doc.text(`Vehicle Owner Tax Code`, 15, 190);
        doc.text(`: ${newOrder.vehicle_Owner_Tax_Code ? newOrder.vehicle_Owner_Tax_Code : 'None'}`, 100, 190);

        doc.setFontSize(18);
        // Add a line separator
        doc.text('-------------------------------------------------------------------------------------', 15, 200);

        doc.setFontSize(24);
        doc.text(`Total:`, 15, 220);
        doc.text(`${newOrder.total} $`, 100, 220);

        // Save or print the invoice
        doc.save('invoice.pdf');
    };



    useEffect(() => {
        // PayPal code
        const script = document.createElement("script");
        script.src =
            "https://www.paypal.com/sdk/js?client-id=ATGXcrNc5l8akd8iyRwk-OI4GXTyXAQy_nybdU9fGSfHpFA3crp3AUjbFIHEKYuiGyTkLpczjCgFS2GH";
        script.async = true;

        script.onload = () => {
            window.paypal
                .Buttons({
                    createOrder: function (data, actions) {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: `${newOrder.total}`,
                                    },
                                },
                            ],
                        });
                    },
                    onApprove: function (data, actions) {
                        const paymentElement = document.getElementById("payment");
                        if (paymentElement) {
                            paymentElement.innerHTML = '<input name="payment" value="Paypal" hidden>';
                        }

                        const formElement = document.getElementById("theForm");
                        if (formElement) {

                            handleOrderClick();
                            handleOrderDTOClick();

                            formElement.reset();

                            handlePayingSuccessBackToHomeClick();


                        } else {
                            console.error("Form with ID 'theForm' not found");
                        }
                    },
                    onError: function (err) {
                        // Handle payment errors
                        console.error("PayPal error:", err);
                        console.log("noooooooooooooooooooooooo")
                        toast.error('Paying have something wrong!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    },
                })
                .render("#paypal-button-container");
        };

        document.body.appendChild(script);

        // Cleanup function
        return () => {
            document.body.removeChild(script);
        };
    }, [newOrder.total, navigate]);

    function handlePayingSuccessBackToHomeClick() {
        toast.success('🦄 Paying successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setPaymentSuccess(false);

        // Gọi hàm in hóa đơn
        printInvoice();

        navigate("/");
    };

    const handleBackButtonClick = () => {
        const shouldCancel = window.confirm("Bạn thật sự muốn cancel và quay về trang chính?");

        if (shouldCancel) {
            setNewOrder({
                ...AuthContext.initialState,
            });
            setPaymentSuccess(false);
            navigate("/");
        }
    };
    const newOrderDTO = {
        id: 0,
        cus_Id: newOrder.cus_Id,
        code_Order: newOrder.code_Order,
        name_Of_Vehicle_Owner: newOrder.name_Of_Vehicle_Owner,
        type_Insurance: newOrder.type_Insurance,
        dateFrom: newOrder.dateFrom,
        dateTo: newOrder.dateTo,
    };
    console.log("newOrderDTO", newOrderDTO);
    async function handleOrderClick() {
        try {
            await axios.post("http://localhost:5044/api/Order", newOrder);

            setNewOrder({
                ...AuthContext.initialState, // Use the initial state from AuthContext
            });

        } catch (error) {
            console.error("Error adding new insurance:", error);
            console.log("Error Response:", error.response);
        }
    }
    async function handleOrderDTOClick() {
        try {

            await axios.post("http://localhost:5044/api/OrderDTO", newOrderDTO);

        } catch (error) {
            console.error("Error adding new insurance:", error);
            console.log("Error Response:", error.response);
        }
    }
    return (
        <div>
            {!paymentSuccess &&
                <div className="container-fluid py-5 mt-5">
                    <div className="container py-5">
                        <div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: 600 }}>
                            <h5 className="text-primary">COMPULSORY INSURANCE FOR MOTORCYCLE CIT</h5>
                            <h1 className="mb-3">Insurance Summary</h1>
                            <p className="mb-3">Tóm tắt đơn hàng</p>
                        </div>

                        <div className="contact-detail position-relative p-5">
                            <p className="mb-4 text-primary">Insurance Information</p>
                            <div className="row g-5">
                                <div className="col-lg-12 wow fadeIn" data-wow-delay=".5s">
                                    <div className="p-5 rounded contact-form row">

                                        <div className="mb-3 col-lg-6">
                                            <label style={{ float: 'left', color: 'black' }}>Insurance - LOẠI XE: {newOrder.type_Insurance}</label>
                                        </div>

                                        <div className="mb-3 col-lg-6">
                                            <label style={{ float: 'left', color: 'black' }}>Number Of Seats - Số Chỗ: {newOrder.number_Of_Seats}</label>
                                        </div>
                                        <hr />

                                        <div className="mb-3 col-lg-6">
                                            <label style={{ float: 'left', color: 'black' }}>Payload - Trọng Tải: {newOrder.payload}</label>
                                        </div>

                                        <div className="mb-3 col-lg-6">
                                            <label style={{ float: 'left', color: 'black' }}>License Plates - Biển Số Xe: {newOrder.licensePlates}</label>
                                        </div>
                                        <hr />

                                        <div className="mb-3 col-lg-6">
                                            <label style={{ float: 'left', color: 'black' }}>Chassis Number - Số Khung Xe: {newOrder.chassisNumber}</label>
                                        </div>

                                        <div className="mb-3 col-lg-6">
                                            <label style={{ float: 'left', color: 'black' }}>Engine Number - Số Máy: {newOrder.engineNumber}</label>
                                        </div>
                                        <hr />

                                        <div className="mb-3 col-lg-6">
                                            <label style={{ float: 'left', color: 'black' }}>VAT - Vat: {newOrder.vat}%</label>
                                        </div>

                                        <div className="mb-3 col-lg-6">
                                            <label style={{ float: 'left', color: 'black' }}>Price - giá tiền : {newOrder.price}$</label>
                                        </div>
                                        <hr />

                                        <div className="mb-3 col-lg-6">
                                            <label style={{ float: 'left', color: 'black' }}>Insurance period from - Thời Hạn BH Từ: {newOrder.dateFrom}</label>
                                        </div>

                                        <div className="mb-3 col-lg-6">
                                            <label style={{ float: 'left', color: 'black' }}>Insurance period to - Thời Hạn BH Đến: {newOrder.dateTo}</label>
                                        </div>
                                        <hr />

                                        <div className="mb-3 col-lg-6">
                                            <label style={{ float: 'left', color: 'black' }}>Duration - Số Năm Bảo Hiểm: {newOrder.duration}</label>
                                        </div>

                                        <div className="mb-3 col-lg-6">
                                            <label style={{ float: 'left', color: 'black' }}>Name Of Vehicle Owner - Chủ Sở Hữu xe: {newOrder.name_Of_Vehicle_Owner}</label>
                                        </div>
                                        <hr />

                                        <div className="mb-3 col-lg-6">
                                            <label style={{ float: 'left', color: 'black' }}>Vehicle Owner Address - địa chỉ chủ xe : {newOrder.vehicle_Owner_Address}</label>
                                        </div>

                                        <div className="mb-3 col-lg-6">
                                            <label style={{ float: 'left', color: 'black' }}>Phone - Số Liên Lạc : {newOrder.phone}</label>
                                        </div>
                                        <hr />

                                        <div className="mb-3 col-lg-6">
                                            <label style={{ float: 'left', color: 'black' }}>ID/CCCD - CCCD : {newOrder.cmnd}</label>
                                        </div>

                                        <div className="mb-3 col-lg-6">
                                            <label style={{ float: 'left', color: 'black' }}>Tax - Thuế xe : {newOrder.vehicle_Owner_Tax_Code}</label>
                                        </div>
                                        <hr />

                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="text-start row" style={{ maxWidth: '100%' }}>
                            <div className="col-lg-2">
                                <button
                                    className="btn bg-primary text-white py-3 px-5"
                                    type="button"
                                    style={{ width: '100%' }}
                                    onClick={handleBackButtonClick}
                                >
                                    Cancel
                                </button>
                            </div>
                            <div className="col-lg-3">
                                <p>Phí bảo hiểm : <span className="text-success" style={{ fontSize: '30px', paddingLeft: '3%' }}> {newOrder.total}$</span></p>
                            </div>
                            <div className="col-lg-7">

                                <form id="theForm" action="">
                                    <div id="paypal-button-container"></div>
                                </form>

                            </div>
                        </div>


                    </div>
                </div>
            }
            {paymentSuccess &&
                <div className="container-fluid py-5 mt-5">
                    <div className="container py-5">
                        <div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: 600 }}>
                            <h5 className="text-primary">COMPULSORY INSURANCE FOR MOTORCYCLE CIT</h5>
                            <h1><p className="text-success m-5">🦄 Paying successfully!</p></h1>
                        </div>
                    </div>
                </div>

            }
        </div>
    );
}

export default InsuranceSummary;