import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { AuthContext } from '../contexts/AuthContext';
import './assets/css/duc.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContextClaimDetail } from '../contexts/AuthContextClaimDetail';
const checkboxes = [
    { text: "Lights and Electrical Systems ($50)", price: 50 },
    { text: "Chassis ($100) ", price: 100 },
    { text: "Brake System ($200)", price: 200 },
    { text: "Speedometer and Gasoline Gauge ($300)", price: 300 },
    { text: "Wheels and Tires ($500)", price: 500 },
    { text: "Suspension and Shock Absorbers ($350)", price: 350 },
    { text: "Fuel System ($550)", price: 550 },
];
function DetailsWarrantyAdmin(props) {
    const { claimDetails, setClaimDetails, handleFetchClaimDetails } = useContext(AuthContextClaimDetail);
    const { navigate } = useContext(AuthContext);
    const { claimNumber } = useParams();
    const [currentClaim, setCurrentClaim] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [customCasePrice, setCustomCasePrice] = useState(0);
    const [customCaseChecked, setCustomCaseChecked] = useState(false);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [selectedCheckboxesString, setSelectedCheckboxesString] = useState('')


    const [newVeh, setNewVeh] = useState({
        id: 0,
        claimNumber: '',
        errorOfVehicle: '',
        price: '',
    });


    // const onChange = (id) => {
    //     const updatedCheckboxes = [...selectedCheckboxes];

    //     const findIdx = updatedCheckboxes.indexOf(id);

    //     if (findIdx > -1) {
    //         updatedCheckboxes.splice(findIdx, 1);
    //     } else {
    //         updatedCheckboxes.push(id);
    //     }

    //     setSelectedCheckboxes(updatedCheckboxes);
    // };
    const onChange = (text) => {
        const updatedCheckboxes = [...selectedCheckboxes];

        if (updatedCheckboxes.includes(text)) {
            // Nếu đã chọn, loại bỏ khỏi danh sách
            updatedCheckboxes.splice(updatedCheckboxes.indexOf(text), 1);
        } else {
            // Nếu chưa chọn, thêm vào danh sách
            updatedCheckboxes.push(text);
        }

        setSelectedCheckboxes(updatedCheckboxes);
    };

    useEffect(() => {
        handleFetchClaimDetails();
        if (!claimNumber) {
            navigate('/')
        }

    }, []);
    const filteredOrders = claimDetails.filter(item => item.claimNumber == claimNumber);
    useEffect(() => {
        setCurrentClaim(filteredOrders);
        setSelectedCheckboxesString(selectedCheckboxes.join(', '));
    }, [claimNumber, selectedCheckboxes]);


    console.log('filteredOrders out', filteredOrders);
    const calculateTotalPrice = () => {
        const prices = {
            Error1: 50,
            Error2: 100,
            Error3: 200,
            Error4: 300,
            Error5: 500,
            Error6: 350,
            Error7: 550,
            CustomCase: customCasePrice,
        };

        let total = 0;

        // Lấy giá tiền cho các ô chọn đã chọn
        const selectedPrices = Object.keys(selectedOptions)
            .filter(option => selectedOptions[option])
            .map(option => prices[option]);

        // Cộng dồn giá tiền từ các ô chọn
        total += selectedPrices.reduce((acc, price) => acc + price, 0);

        // Cộng dồn giá tiền từ trường hợp mới nếu được chọn
        if (customCaseChecked) {
            total += customCasePrice;
        }

        return total;
    };

    const handleCustomCaseChange = (event) => {
        const price = parseFloat(event.target.value) || 0;
        setCustomCasePrice(price);
    };

    const handleCustomCheckboxChange = () => {
        setCustomCaseChecked(prevChecked => !prevChecked);
    };

    async function handleSubmit() {
        try {

            if (selectedCheckboxes.length === 0 && !customCaseChecked) {
                toast.error('no no no no, choose plz !', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }); 
                return;
            }

            let totalAmount = 0; // Giá cứng

            // Tính tổng giá dựa trên các checkbox đã chọn
            selectedCheckboxes.forEach((checkboxText) => {
                const selectedCheckbox = checkboxes.find((checkbox) => checkbox.text === checkboxText);
                if (selectedCheckbox) {
                    totalAmount += selectedCheckbox.price;
                }
            });

            // Nếu chọn trường hợp khác, cộng thêm giá
            if (customCaseChecked) {
                totalAmount += customCasePrice;
            }

            console.log("totalAmount", totalAmount);

            newVeh.errorOfVehicle = selectedCheckboxesString;
            newVeh.claimNumber = claimNumber;
            newVeh.price = totalAmount;


            await axios.post("http://localhost:5044/api/VehicleError", newVeh);

            // setNewVeh the form after successful addition
            setNewVeh({
                id: 0,
                claimNumber: '',
                errorOfVehicle: '',
                price: '',
            });


            toast.success('ok ok ok !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/warrantyPolicyAdmin')
        } catch (error) {
            console.log("Error adding new insurance:", error);
            // If there's an error, you may want to handle it accordingly
        }
    }
    return (
        <div>
            <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <Sidebar />


                <div class="body-wrapper">
                    {/* <!--  Header Start --> */}
                    <Header />
                    {/* <!--  Header End --> */}
                    <br />
                    <div class="container-fluid">
                        {filteredOrders?.length > 0 ? (
                            <div className="list-container mt-3">
                                {filteredOrders.map((item, index) => (
                                    <div key={index} className="claim-item row">
                                        <p className='col-lg-6'>ClaimNumber: {item.claimNumber}</p>
                                        <p className='col-lg-6'>PolicyNumber: {item.policyNumber}</p>
                                        <p className='col-lg-6'>PolicyStartDate: {item.policyStartDate}</p>
                                        <p className='col-lg-6'>PolicyEndDate: {item.policyEndDate}</p>
                                        <p className='col-lg-6'>CusName: {item.cusName}</p>
                                        <p className='col-lg-6'>PlaceOfAccident: {item.placeOfAccident}</p>
                                        <p className='col-lg-6'>DateOfAccident: {item.dateOfAccident}</p>
                                        <p className='col-lg-6'>InsuredAmount: {item.insuredAmount}</p>
                                        <p className='col-lg-6'>ClaimableAmount: {item.claimableAmount}</p>
                                        <p className='col-lg-6'>NameOfBank: {item.nameOfBank}</p>
                                        <p className='col-lg-6'>BankAccountNumber: {item.bankAccountNumber}</p>
                                        <p className='col-lg-6'>ErrorVehicle: {item.errorOfVehicle}</p>
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{ color: 'red' }}>Chưa có sản phẩm.</p>
                        )}
                        {/* Form to add a new claim */}



                        <p>Selected checkboxes: {selectedCheckboxesString}</p>
                        <p className="col-lg-6">
                            {checkboxes.map((checkbox) => (
                                <>
                                    <input
                                        type="checkbox"
                                        id="vehicle1"
                                        name="vehicle1"
                                        value="Error1"
                                        onChange={() => onChange(checkbox.text)}
                                        checked={selectedCheckboxes.includes(checkbox.text)}
                                    />
                                    <label htmlFor="vehicle1">{checkbox.text}</label>
                                    <br />
                                </>
                            ))}

                            <input
                                type="checkbox"
                                id="customCase"
                                name="customCase"
                                checked={customCaseChecked}
                                onChange={handleCustomCheckboxChange}
                            />
                            <label htmlFor="customCase">Other case</label>
                            <br />
                            {customCaseChecked && (
                                <input
                                    type="number"
                                    id="customCasePrice"
                                    name="customCasePrice"
                                    placeholder="Price here"
                                    value={customCasePrice}
                                    onChange={handleCustomCaseChange}
                                />
                            )}
                        </p>
                        <button className="button-90" onClick={handleSubmit}>Submit</button>
                    </div>


                </div>

            </div>


        </div>



    );
}

export default DetailsWarrantyAdmin;

