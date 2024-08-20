import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function InsurancesForm(props) {
    const { handleFetchProducts, products, navigate, token, customerRank
        , newOrder, setNewOrder, handleFetchOrders, orders, setOrders } = useContext(AuthContext);
    const { id } = useParams();

    //orders, setOrders, handleFetchOrders,


    // Silver , Gold , Platinum , Diamond
    useEffect(() => {
        if (customerRank == 'Diamond') {
            newOrder.vat = newOrder.vat - 8;
        } else if (customerRank == 'Platinum') {
            newOrder.vat = newOrder.vat - 6;
        } else if (customerRank == 'Gold') {
            newOrder.vat = newOrder.vat - 4;
        } else if (customerRank == 'Silver') {
            newOrder.vat = newOrder.vat - 2;
        }
    }, [newOrder])

    const [hasSubmitted, setHasSubmitted] = useState(false);

    const [totalInsuranceFee, setTotalInsuranceFee] = useState(0);

    const [inputErrors, setInputErrors] = useState({
        id: '',
        id_Type_Insurance: '',

        licensePlates: '',
        chassisNumber: '',
        engineNumber: '',

        dateFrom: '',
        dateTo: '',
        duration: '',

        name_Of_Vehicle_Owner: '',
        vehicle_Owner_Address: '',

        phone: '',
        cmnd: '',
        vehicle_Owner_Tax_Code: '',

        total: '',

    });



    const [selectedInsurance, setSelectedInsurance] = useState({});

    const [vatPercentage, setVatPercentage] = useState(0);

    useEffect(() => {
        // Update total whenever totalInsuranceFee or duration changes
        const updateTotal = () => {
            const total = totalInsuranceFee * newOrder.duration;
            setNewOrder(prevState => ({
                ...prevState,
                total: parseFloat(total.toFixed(2)),
            }));
        };

        updateTotal();
    }, [totalInsuranceFee, newOrder.duration]);

    const filteredProducts = products.filter(
        (product) => product.id_Type_Insurance === parseInt(id)
    );

    const handleInsuranceTypeChange = (productId) => {
        if (productId !== "CHOOSE") {
            const selectedProduct = products.find(product => product.id_Product === parseInt(productId));
            setSelectedInsurance(selectedProduct);

            // Set VAT percentage
            setVatPercentage(selectedProduct.vat || 0);

            // Update id_Type_Insurance in newOrder state
            setNewOrder(prevState => ({
                ...prevState,
                type_Insurance: selectedProduct.contract_Name  // Change this line
            }));
        } else {
            setSelectedInsurance({});
            setVatPercentage(0);

            // Reset id_Type_Insurance in newOrder state when "CHOOSE" is selected
            setNewOrder(prevState => ({
                ...prevState,
                type_Insurance: ''
            }));
        }
    };

    const validateInputFields = () => {
        const errors = {};
        if (!selectedInsurance.id_Product) {
            errors.insuranceType = 'Please choose an insurance type';
        }

        // Validate licensePlates
        // const regexLicensePlates = /^[A-Za-z0-9\s]*$/;
        // if (newOrder.licensePlates && !regexLicensePlates.test(newOrder.licensePlates)) {
        //     errors.licensePlates = 'License plates must not contain special characters';
        // } else if (!newOrder.licensePlates) {
        //     errors.contract_Name = 'Please enter License Plates';
        // }
        //
        // Validate licensePlates
        const regexLicensePlates = /^[A-Za-z0-9\s]*$/;
        if (newOrder.licensePlates === undefined || newOrder.licensePlates === null || (typeof newOrder.licensePlates === 'string' && newOrder.licensePlates.trim() === '')) {
            // Trường licensePlates được phép để trống
        } else if (!regexLicensePlates.test(newOrder.licensePlates)) {
            errors.licensePlates = 'License plates must not contain special characters';
        }

        // Validate chassisNumber
        const regexChassisNumber = /^[A-Za-z0-9\s]*$/; // Removed the "-" from the allowed characters
        if (newOrder.chassisNumber && !regexChassisNumber.test(newOrder.chassisNumber)) {
            errors.chassisNumber = 'Chassis number must not contain special characters.';
        } else if (!newOrder.chassisNumber) {
            errors.chassisNumber = 'Please enter Chassis Number';
        }


        // Validate engineNumber
        const regexEngineNumber = /^[A-Za-z0-9\s]*$/; // Removed the "-" from the allowed characters
        if (newOrder.engineNumber && !regexEngineNumber.test(newOrder.engineNumber)) {
            errors.engineNumber = 'Engine number must not contain special characters.';
        } else if (!newOrder.engineNumber) {
            errors.engineNumber = 'Please enter Engine Number';
        }


        if (!newOrder.dateFrom) {
            errors.dateFrom = 'Please enter Date From';
        }

        if (!newOrder.duration) {
            errors.duration = 'Please enter Duration';
        }


        // Validate name_Of_Vehicle_Owner
        const regexNameOfVehicleOwner = /^[A-Za-z0-9\s]+$/; // Alphanumeric characters and spaces
        const nameOfVehicleOwner = newOrder.name_Of_Vehicle_Owner.trim(); // Remove leading and trailing spaces

        if (!nameOfVehicleOwner) {
            errors.name_Of_Vehicle_Owner = 'Please enter Name Of Vehicle Owner';
        } else if (!regexNameOfVehicleOwner.test(nameOfVehicleOwner)) {
            errors.name_Of_Vehicle_Owner = 'Name Of Vehicle Owner must only contain alphanumeric characters and spaces.';
        } else if (nameOfVehicleOwner.length < 2 || nameOfVehicleOwner.length > 30) {
            errors.name_Of_Vehicle_Owner = 'Name Of Vehicle Owner must be between 2 and 30 characters.';
        }

        // Validate vehicle_Owner_Address
        const regexVehicleOwnerAddress = /^[A-Za-z0-9\s\/]+$/; // Alphanumeric characters, spaces, and '/'
        const vehicleOwnerAddress = newOrder.vehicle_Owner_Address.trim(); // Remove leading and trailing spaces

        if (!vehicleOwnerAddress) {
            errors.vehicle_Owner_Address = 'Please enter Vehicle Owner Address';
        } else if (!regexVehicleOwnerAddress.test(vehicleOwnerAddress)) {
            errors.vehicle_Owner_Address = 'Vehicle Owner Address must only contain alphanumeric characters, spaces, and "/"';
        } else if (vehicleOwnerAddress.length < 2 || vehicleOwnerAddress.length > 200) {
            errors.vehicle_Owner_Address = 'Vehicle Owner Address must be between 2 and 200 characters.';
        }

        // Validate phone (optional)
        const regexPhone = /^\d+$/; // Numeric characters only
        const phone = newOrder.phone.trim(); // Remove leading and trailing spaces

        if (phone && !regexPhone.test(phone)) {
            errors.phone = 'Phone Number must only contain numeric characters.';
        } else if (phone && (phone.length < 10 || phone.length > 11)) {
            errors.phone = 'Phone Number must be between 10 and 11 digits.';
        }

        // Validate cmnd (optional)
        const regexCmnd = /^\d+$/; // Numeric characters only
        const cmnd = newOrder.cmnd.trim(); // Remove leading and trailing spaces

        if (cmnd && !regexCmnd.test(cmnd)) {
            errors.cmnd = 'ID/CCCD Number must only contain numeric characters.';
        } else if (cmnd && cmnd.length !== 12) {
            errors.cmnd = 'ID/CCCD Number must be exactly 12 digits.';
        }

        // Validate vehicle_Owner_Tax_Code (optional)
        const regexVehicleOwnerTaxCode = /^[A-Za-z0-9\-]+$/; // Alphanumeric characters and hyphen
        const vehicleOwnerTaxCode = newOrder.vehicle_Owner_Tax_Code.trim(); // Remove leading and trailing spaces

        if (vehicleOwnerTaxCode && !regexVehicleOwnerTaxCode.test(vehicleOwnerTaxCode)) {
            errors.vehicle_Owner_Tax_Code = 'Vehicle Owner Tax Code must only contain alphanumeric characters and hyphen.';
        } else if (vehicleOwnerTaxCode && vehicleOwnerTaxCode.length !== 14) {
            errors.vehicle_Owner_Tax_Code = 'Vehicle Owner Tax Code must be exactly 14 characters.';
        }


        // Cập nhật trạng thái lỗi
        setInputErrors(errors);

        // Trả về true nếu không có lỗi, ngược lại trả về false
        return Object.keys(errors).length === 0;

        setInputErrors(errors);
        return Object.keys(errors).length === 0; // Returns true if there are no errors
    };



    useEffect(() => {
        validateInputFields();
    }, [
        selectedInsurance.id_Product,
        newOrder.chassisNumber,
        newOrder.licensePlates,
        newOrder.engineNumber,
        newOrder.dateFrom,
        newOrder.duration,
        newOrder.name_Of_Vehicle_Owner,
        newOrder.vehicle_Owner_Address,
        newOrder.phone,
        newOrder.cmnd,
        newOrder.vehicle_Owner_Tax_Code
    ]);















    useEffect(() => {
        handleFetchProducts();
        handleFetchOrders();
        function handleOrders() {
            let filteredOrders = orders.filter(item => item.cus_Id == token?.Cus_id);
            setOrders(filteredOrders);
        }
        handleOrders();
    }, [id]);


    useEffect(() => {
        // Update dateTo when dateFrom or duration changes
        const updateDateTo = () => {
            if (newOrder.dateFrom && newOrder.duration) {
                const startDate = new Date(newOrder.dateFrom);
                const endDate = new Date(startDate);

                endDate.setFullYear(endDate.getFullYear() + newOrder.duration);

                setNewOrder(prevState => ({
                    ...prevState,
                    dateTo: endDate.toISOString().split('T')[0]
                }));
            }
        };

        updateDateTo();
    }, [newOrder.dateFrom, newOrder.duration]);


    useEffect(() => {
        setVatPercentage(newOrder.vat);
    }, [newOrder]);

    useEffect(() => {
        const totalFee = selectedInsurance.price || 0;
        const vatAmount = (totalFee * vatPercentage) / 100;
        const totalWithVat = totalFee + vatAmount;


        setTotalInsuranceFee(totalWithVat);
    }, [selectedInsurance, vatPercentage]);

    newOrder.cus_Id = parseInt(token?.Cus_id);

    newOrder.level_Responsibility_For_People = parseInt(selectedInsurance?.level_Responsibility_For_People);
    newOrder.level_Responsibility_For_The_Property = parseInt(selectedInsurance?.level_Responsibility_For_The_Property);

    newOrder.number_Of_Seats = parseInt(selectedInsurance?.number_Of_Seats);
    newOrder.payload = parseInt(selectedInsurance?.payload);
    newOrder.price = parseInt(selectedInsurance?.price);
    newOrder.vat = parseInt(selectedInsurance?.vat);

    const { v4: uuidv4 } = require('uuid');
    // Generate a unique order ID
    const orderId = uuidv4();
    newOrder.code_Order = orderId;


    const handleSubmit = () => {
        setHasSubmitted(true);

        if (!newOrder.cus_Id) {
            navigate('/login');
            toast.error('Please login before purchasing !', {
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

        const isValid = validateInputFields();
        if (isValid) {
            let filteredOrders = orders.filter(item => item.cus_Id == token?.Cus_id);

            const duplicateChassisNumber = filteredOrders.filter(item => item.chassisNumber == newOrder.chassisNumber || item.engineNumber == newOrder.engineNumber);

            if (duplicateChassisNumber.length != 0) {
                // Show a confirmation dialog for duplicate chassis number
                const userResponse = window.confirm('Warning: Chassis number has been used in a previous order. Do you want to proceed to payment?');

                if (userResponse) {
                    // Proceed to insurance summary if the user accepts
                    navigate('/insuranceSummary');
                    setHasSubmitted(false);
                    toast.success('You have successfully registered, please check your order carefully before paying!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    toast.error('The chassis number and engine number were previously used. Please check again !', {
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

            } else {
                // Proceed to insurance summary if no duplicate chassis number
                navigate('/insuranceSummary');
                setHasSubmitted(false);
                toast.success('You have successfully registered, please check your order carefully before paying!', {
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
        } else {
            toast.error('You made a mistake somewhere, please correct it!', {
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
    };

    return (
        <div>
            <div className="container-fluid py-5 mt-5">
                <div className="container py-5">
                    <div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: 600 }}>
                        <h5 className="text-primary">COMPULSORY INSURANCE FOR MOTORCYCLE CIT</h5>
                        <h1 className="mb-3">CHOOSE INSURANCE TYPE</h1>
                        <p className="mb-2">Nếu bạn cảm thấy mệt mỏi thì <a href="https://i.pinimg.com/564x/cc/ab/c3/ccabc35975dc1b013d59f46a623e07db.jpg">{customerRank ? customerRank : ""}</a>.</p>
                    </div>


                    <form>
                        <div className="contact-detail position-relative p-5">
                            <h3 style={{ textAlign: 'center' }} className="mb-4 text-primary">Insured Vehicle Information - Thông Tin Xe Tham Gia Bảo Hiểm</h3>
                            <p style={{ color: 'red', textAlign: 'center' }}>Trường hợp xe mới chưa đăng ký, thì nhập đầy đủ số khung</p>
                            <div className="row g-5">
                                <div className="col-lg-12 wow fadeIn" data-wow-delay=".5s">
                                    <div className="p-5 rounded contact-form row">
                                        <div className="mb-2 col-lg-6">
                                            <label>INSURANCE TYPE</label>
                                            <select
                                                className={`form-control border-0 py-3 border-0 py-3 ${hasSubmitted && inputErrors.insuranceType ? 'is-invalid border-0 py-3' : ''}`}
                                                style={{ backgroundColor: 'white' }}
                                                onChange={(e) => handleInsuranceTypeChange(e.target.value)}
                                            >
                                                <option value="CHOOSE">CHOOSE INSURANCE TYPE</option>
                                                {filteredProducts.map((product) => (
                                                    <option key={product.id_Product} value={product.id_Product}>
                                                        {product.contract_Name}
                                                    </option>
                                                ))}
                                            </select>
                                            {hasSubmitted && inputErrors.insuranceType && (
                                                <div className="invalid-feedback">{inputErrors.insuranceType}</div>
                                            )}
                                        </div>

                                        <div className="mb-2 col-lg-6">
                                            <label>Number of Seats</label>
                                            <input
                                                type="number"
                                                className="form-control border-0 py-3"
                                                placeholder="Số Chỗ"
                                                value={selectedInsurance.number_Of_Seats || ''}
                                                readOnly
                                            />
                                        </div>
                                        <div className="mb-2 col-lg-6">
                                            <label>Payload</label>
                                            <input
                                                type="number"
                                                className="form-control border-0 py-3"
                                                placeholder="Trọng Tải"
                                                value={selectedInsurance.payload !== undefined ? selectedInsurance.payload : ''}
                                                readOnly
                                            />
                                        </div>


                                        <div className="mb-2 col-lg-6">
                                            <label>License plates</label>
                                            <input type="text"
                                                className={`form-control border-0 py-3 ${hasSubmitted && inputErrors.licensePlates && 'is-invalid border-0 py-3'}`}
                                                id="licensePlates"
                                                value={newOrder.licensePlates}
                                                onChange={(e) => setNewOrder({ ...newOrder, licensePlates: e.target.value })}
                                                placeholder="Biển Số Xe"
                                            />
                                            {hasSubmitted && inputErrors.licensePlates && (
                                                <div className="invalid-feedback">{inputErrors.licensePlates}</div>
                                            )}
                                        </div>
                                        <div className="mb-2 col-lg-6">
                                            <label>Chassis number (*)</label>
                                            <input type="text"
                                                className={`form-control border-0 py-3 ${hasSubmitted && inputErrors.chassisNumber && 'is-invalid border-0 py-3'}`}
                                                id="chassisNumber"
                                                value={newOrder.chassisNumber}
                                                onChange={(e) => setNewOrder({ ...newOrder, chassisNumber: e.target.value })}
                                                placeholder="Số Khung Xe"
                                            />
                                            {hasSubmitted && inputErrors.chassisNumber && (
                                                <div className="invalid-feedback">{inputErrors.chassisNumber}</div>
                                            )}
                                        </div>
                                        <div className="mb-2 col-lg-6">
                                            <label>Vehicle engine number (*)</label>
                                            <input type="text"
                                                className={`form-control border-0 py-3 ${hasSubmitted && inputErrors.engineNumber && 'is-invalid border-0 py-3'}`}
                                                id="engineNumber"
                                                value={newOrder.engineNumber}
                                                onChange={(e) => setNewOrder({ ...newOrder, engineNumber: e.target.value })}
                                                placeholder="Số Máy"
                                            />
                                            {hasSubmitted && inputErrors.engineNumber && (
                                                <div className="invalid-feedback">{inputErrors.engineNumber}</div>
                                            )}
                                        </div>

                                        <div className="mb-2 col-lg-6">
                                            <label>Compulsory Insurance Fee</label>
                                            <input
                                                type="number"
                                                className="form-control border-0 py-3"
                                                placeholder="Phí Bảo Hiểm Bắt Buộc"
                                                value={selectedInsurance.price !== undefined ? selectedInsurance.price : ''}
                                                readOnly
                                            />
                                        </div>
                                        <div className="mb-2 col-lg-6">
                                            <label>VAT (%)</label>
                                            <input
                                                type="number"
                                                className="form-control border-0 py-3"
                                                placeholder="VAT"
                                                value={selectedInsurance.vat !== undefined ? selectedInsurance.vat : ''}
                                                readOnly
                                            />
                                        </div>
                                        <div className="mb-2 col-lg-6">
                                            <label>Total Compulsory Insurance Premium</label>
                                            <input
                                                type="text"
                                                className="form-control border-0 py-3"
                                                placeholder="Tổng Phí Bảo Hiểm Bắt Buộc"
                                                value={totalInsuranceFee.toFixed(2)}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="contact-detail position-relative p-5">
                            <p className="mb-4 text-primary">Duration of insurance - Thời Gian Bảo Hiểm</p>
                            <div className="row g-5">
                                <div className="col-lg-12 wow fadeIn" data-wow-delay=".5s">
                                    <div className="p-5 rounded contact-form row">


                                        {/* date */}
                                        <div className="mb-2 col-lg-3">
                                            <label>Date from (*)</label>
                                            <input
                                                type="date"
                                                className={`form-control border-0 py-3 ${hasSubmitted && inputErrors.dateFrom ? 'is-invalid border-0 py-3' : ''}`}
                                                placeholder="Date from (*)"
                                                value={newOrder.dateFrom}
                                                min={new Date().toISOString().split('T')[0]} // Set the minimum date to the current date
                                                onChange={(e) => {
                                                    const selectedDate = e.target.value;

                                                    // Check if the duration is selected
                                                    const selectedDuration = parseInt(document.querySelector("#durationSelect").value);
                                                    if (selectedDuration) {
                                                        const startDate = selectedDate;

                                                        // Update dateTo based on the selected duration
                                                        const endDate = new Date(startDate);
                                                        if (selectedDuration) {
                                                            endDate.setFullYear(endDate.getFullYear() + selectedDuration);
                                                        }

                                                        setNewOrder((prevState) => ({
                                                            ...prevState,
                                                            dateTo: endDate.toISOString().split('T')[0],
                                                            dateFrom: startDate,
                                                        }));

                                                        newOrder.dateFrom = selectedInsurance?.dateFrom;
                                                    } else {
                                                        toast.error('Please CHOOSE THE DURATION before selecting the date!', {
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
                                                }}
                                            />
                                            {hasSubmitted && inputErrors.dateFrom && (
                                                <div className="invalid-feedback">{inputErrors.dateFrom}</div>
                                            )}
                                        </div>

                                        <div className="mb-2 col-lg-3">
                                            <label>Date to (*)</label>
                                            <input
                                                type="date"
                                                readOnly
                                                className="form-control border-0 py-3"
                                                placeholder="Date to (*)"
                                                style={{ backgroundColor: 'white' }}
                                                value={newOrder.dateTo}
                                                onChange={(e) => { newOrder.dateTo = selectedInsurance?.dateTo; }}
                                            />
                                        </div>

                                        {/* years */}
                                        <div className="mb-2 col-lg-6">

                                            <label>Choose the duration</label>
                                            <select
                                                id="durationSelect"
                                                className={`form-control border-0 py-3 ${hasSubmitted && inputErrors.duration ? 'is-invalid border-0 py-3' : ''}`}
                                                style={{ backgroundColor: 'white' }}
                                                onChange={(e) => {
                                                    const selectedDuration = parseInt(e.target.value);
                                                    setNewOrder((prevState) => ({
                                                        ...prevState,
                                                        duration: selectedDuration, // Update the duration in the state
                                                    }));

                                                    // Update dateTo based on the selected duration
                                                    if (newOrder.dateFrom) {
                                                        const endDate = new Date(newOrder.dateFrom);
                                                        if (selectedDuration) {
                                                            endDate.setFullYear(endDate.getFullYear() + selectedDuration);
                                                        }

                                                        setNewOrder((prevState) => ({
                                                            ...prevState,
                                                            dateTo: endDate.toISOString().split('T')[0],
                                                        }));
                                                    }
                                                }}
                                            >
                                                <option value="">Choose the duration</option>
                                                {Array.from({ length: selectedInsurance.limited_Years }, (_, index) => (
                                                    <option key={index + 1} value={index + 1}>
                                                        {index + 1}
                                                    </option>
                                                ))}
                                            </select>
                                            {hasSubmitted && inputErrors.duration && (
                                                <div className="invalid-feedback">{inputErrors.duration}</div>
                                            )}
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="contact-detail position-relative p-5">
                            <p className="mb-4 text-primary">Level of Responsibility - Mức Trách Nhiệm</p>
                            <div className="row g-5">
                                <div className="col-lg-12 wow fadeIn" data-wow-delay=".5s">
                                    <div className="p-5 rounded contact-form row">

                                        <div className="mb-2 col-lg-6">
                                            <label>For People : ($)</label>
                                            <input
                                                type="text"
                                                className="form-control border-0 py-3"
                                                placeholder="$$$"
                                                value={selectedInsurance.level_Responsibility_For_People !== undefined ? selectedInsurance.level_Responsibility_For_People : ''}
                                                readOnly
                                                style={{ backgroundColor: 'white' }}
                                            />
                                        </div>
                                        <div className="mb-2 col-lg-6">
                                            <label>For The Property : ($)</label>
                                            <input
                                                type="text"
                                                className="form-control border-0 py-3"
                                                placeholder="$$$"
                                                value={selectedInsurance.level_Responsibility_For_The_Property !== undefined ? selectedInsurance.level_Responsibility_For_The_Property : ''}
                                                readOnly
                                                style={{ backgroundColor: 'white' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="contact-detail position-relative p-5">
                            <p className="mb-4 text-primary">SUBSCRIBER INFORMATION</p>
                            <div className="row g-5">
                                <div className="col-lg-12 wow fadeIn" data-wow-delay=".5s">
                                    <div className="p-5 rounded contact-form row">

                                        <div className="mb-3 col-lg-6">
                                            <label>Full Name of Insurance Claimant (*)</label>
                                            <input type="text"
                                                className={`form-control border-0 py-3 ${hasSubmitted && inputErrors.name_Of_Vehicle_Owner && 'is-invalid border-0 py-3'}`}
                                                id="name_Of_Vehicle_Owner"
                                                value={newOrder.name_Of_Vehicle_Owner}
                                                onChange={(e) => setNewOrder({ ...newOrder, name_Of_Vehicle_Owner: e.target.value })}
                                                placeholder="Full Name of Insurance Claimant (*)"
                                            />
                                            {hasSubmitted && inputErrors.name_Of_Vehicle_Owner && (
                                                <div className="invalid-feedback">{inputErrors.name_Of_Vehicle_Owner}</div>
                                            )}
                                        </div>
                                        <div className="mb-3 col-lg-6">
                                            <label>Insurance Claimant Address (*)</label>
                                            <input type="text"
                                                className={`form-control border-0 py-3 ${hasSubmitted && inputErrors.vehicle_Owner_Address && 'is-invalid border-0 py-3'}`}
                                                id="vehicle_Owner_Address"
                                                value={newOrder.vehicle_Owner_Address}
                                                onChange={(e) => setNewOrder({ ...newOrder, vehicle_Owner_Address: e.target.value })}
                                                placeholder="Insurance Claimant Address"
                                            />
                                            {hasSubmitted && inputErrors.vehicle_Owner_Address && (
                                                <div className="invalid-feedback">{inputErrors.vehicle_Owner_Address}</div>
                                            )}
                                        </div>

                                        <div className="mb-3 col-lg-6">
                                            <label>Claimant Phone Number</label>
                                            <input type="text"
                                                className={`form-control border-0 py-3 ${hasSubmitted && inputErrors.phone && 'is-invalid border-0 py-3'}`}
                                                id="phone"
                                                value={newOrder.phone}
                                                onChange={(e) => setNewOrder({ ...newOrder, phone: e.target.value })}
                                                placeholder="Claimant Phone Number"
                                            />
                                            {hasSubmitted && inputErrors.phone && (
                                                <div className="invalid-feedback">{inputErrors.phone}</div>
                                            )}
                                        </div>

                                        <div className="mb-3 col-lg-6">
                                            <label>ID/CCCD Number of Insurance Claimant</label>
                                            <input type="text"
                                                className={`form-control border-0 py-3 ${hasSubmitted && inputErrors.cmnd && 'is-invalid border-0 py-3'}`}
                                                id="cmnd"
                                                value={newOrder.cmnd}
                                                onChange={(e) => setNewOrder({ ...newOrder, cmnd: e.target.value })}
                                                placeholder="ID/CCCD Number of Insurance Claimant"
                                            />
                                            {hasSubmitted && inputErrors.cmnd && (
                                                <div className="invalid-feedback">{inputErrors.cmnd}</div>
                                            )}
                                        </div>

                                        <div className="mb-3 col-lg-6">
                                            <label>Vehicle Owner Tax Code</label>
                                            <input type="text"
                                                className={`form-control border-0 py-3 ${hasSubmitted && inputErrors.vehicle_Owner_Tax_Code && 'is-invalid border-0 py-3'}`}
                                                id="vehicle_Owner_Tax_Code"
                                                value={newOrder.vehicle_Owner_Tax_Code}
                                                onChange={(e) => setNewOrder({ ...newOrder, vehicle_Owner_Tax_Code: e.target.value })}
                                                placeholder="Vehicle Owner Tax Code"
                                            />
                                            {hasSubmitted && inputErrors.vehicle_Owner_Tax_Code && (
                                                <div className="invalid-feedback">{inputErrors.vehicle_Owner_Tax_Code}</div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="text-start row" style={{ maxWidth: '100%' }}>
                            <div className="col-lg-7">
                                <p>Phí bảo hiểm : <span className="text-success" style={{ fontSize: '30px', paddingLeft: '3%' }}> {newOrder.total}$</span></p>
                            </div>
                            <div className="col-lg-5">
                                <button
                                    className="btn bg-primary text-white py-3 px-5"
                                    type="button"
                                    style={{ width: '100%' }}
                                    onClick={handleSubmit}
                                >
                                    Submit
                                    <i className="fas fa-angle-right text-secondary me-2" style={{ paddingLeft: '20%' }}></i>
                                    <i className="fas fa-angle-right text-secondary me-2" style={{ paddingLeft: '5px' }}></i>
                                    <i className="fas fa-angle-right text-secondary me-2" style={{ paddingLeft: '5px' }}></i>
                                </button>

                            </div>
                        </div>



                    </form>


                </div>



            </div>
        </div>
    );
}

export default InsurancesForm;