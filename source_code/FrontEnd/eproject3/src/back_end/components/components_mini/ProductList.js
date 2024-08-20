import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
// import { CKEditor } from "@ckeditor/ckeditor5-react";


// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function ProductList(props) {
    const {
        handleFetchProducts,
        products,
        setProducts
    } = useContext(AuthContext);

    const [hasSubmitted, setHasSubmitted] = useState(false);


    const [newProduct, setNewProduct] = useState({ barcode: '', contract_Name: '', id_Type_Insurance: '', vat: '', limited_Years: '', level_Responsibility_For_People: '', level_Responsibility_For_The_Property: '', reason: '', damages: '', price: '', number_Of_Seats: '', payload: '' });
    const [typeOfInsuranceList, setTypeOfInsuranceList] = useState([]);

    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editProductId, setEditProductId] = useState(null);

    const [inputErrors, setInputErrors] = useState({ barcode: '', contract_Name: '', id_Type_Insurance: '', vat: '', limited_Years: '', level_Responsibility_For_People: '', level_Responsibility_For_The_Property: '', reason: '', damages: '', price: '', number_Of_Seats: '', payload: '' });
    // contract_Name: , id_Type_Insurance: , vat: , limited_Years: , level_Responsibility_For_People: , level_Responsibility_For_The_Property: , reason, damages


    // phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;


    async function handleAddProduct() {

        setHasSubmitted(true);

        try {
            const isValid = validateInputs();
            if (!isValid) {
                return; // Ngừng hàm nếu có lỗi
            }

            // Attempt to add a new insurance contract
            await axios.post("http://localhost:5044/api/Product", newProduct);

            // Fetch the updated list from the server
            const updatedData = await axios.get("http://localhost:5044/api/Product");

            setProducts(updatedData.data);
            setNewProduct({ barcode: '', contract_Name: '', id_Type_Insurance: '', vat: '', limited_Years: '', level_Responsibility_For_People: '', level_Responsibility_For_The_Property: '', reason: '', damages: '', price: '', number_Of_Seats: '', payload: '' });
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
        }
    }
    async function handleEditProduct(id) {
        setInputErrors({ barcode: '', contract_Name: '', id_Type_Insurance: '', vat: '', limited_Years: '', level_Responsibility_For_People: '', level_Responsibility_For_The_Property: '', reason: '', damages: '', price: '', number_Of_Seats: '', payload: '' })
        try {
            const response = await axios.get(`http://localhost:5044/api/Product/${id}`);
            const productToEdit = response.data;

            setNewProduct({
                id_Product: productToEdit.id_Product,
                contract_Name: productToEdit.contract_Name,
                id_Type_Insurance: productToEdit.id_Type_Insurance,
                vat: productToEdit.vat,
                limited_Years: productToEdit.limited_Years,
                level_Responsibility_For_People: productToEdit.level_Responsibility_For_People,
                level_Responsibility_For_The_Property: productToEdit.level_Responsibility_For_The_Property,
                reason: productToEdit.reason,
                damages: productToEdit.damages,
                price: productToEdit.price,
                number_Of_Seats: productToEdit.number_Of_Seats,
                payload: productToEdit.payload,

                // 
            });

            setIsEditing(true);
            setEditProductId(id);
        } catch (error) {
            console.log("Error fetching insurance for editing:", error);
        }
    }
    async function handleUpdateProduct() {

        setHasSubmitted(true);

        try {

            const isValid = validateInputs();
            if (!isValid) {
                return; // Ngừng hàm nếu có lỗi
            }


            await axios.put(`http://localhost:5044/api/Product/${editProductId}`, newProduct);

            const updatedData = await axios.get("http://localhost:5044/api/Product");
            setProducts(updatedData.data);

            setNewProduct({ barcode: '', contract_Name: '', id_Type_Insurance: '', vat: '', limited_Years: '', level_Responsibility_For_People: '', level_Responsibility_For_The_Property: '', reason: '', damages: '', price: '', number_Of_Seats: '', payload: '' });

            setIsEditing(false);
            setIsAdding(false);
            setEditProductId(null);
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
        }
    }
    async function handleDeleteProduct(id) {
        // console.log("id", id);

        try {
            // Attempt to delete from the server
            await axios.delete(`http://localhost:5044/api/Product/${id}`);

            // Fetch the updated list from the server
            const updatedData = await axios.get("http://localhost:5044/api/Product");
            // Set the state with the updated data from the server
            setProducts(updatedData.data);

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
            console.log("Error deleting product:", error);
            // If there's an error, you may want to handle it accordingly
        }
    }
    function handleCancel() {
        setNewProduct({ barcode: '', contract_Name: '', id_Type_Insurance: '', vat: '', limited_Years: '', level_Responsibility_For_People: '', level_Responsibility_For_The_Property: '', reason: '', damages: '', price: '', number_Of_Seats: '', payload: '' });

        setIsAdding(false);
        setIsEditing(false);

        setHasSubmitted(false);

        setEditProductId(null);

        setInputErrors({ barcode: '', contract_Name: '', id_Type_Insurance: '', vat: '', limited_Years: '', level_Responsibility_For_People: '', level_Responsibility_For_The_Property: '', reason: '', damages: '', price: '', number_Of_Seats: '', payload: '' })
    }

    async function fetchTypeOfInsuranceList() {
        try {
            const response = await axios.get("http://localhost:5044/api/Type_Insurance");
            if (response.status === 200) {
                setTypeOfInsuranceList(response.data);
            }
        } catch (error) {
            console.log("Error fetching Type Of Insurance:", error);
        }
    }
    useEffect(() => {
        handleFetchProducts();
        fetchTypeOfInsuranceList();
    }, []);
    const idToInsuranceName = {};
    typeOfInsuranceList.forEach(type => {
        idToInsuranceName[type.id_Type_Insurance] = type.type;
    });
    const validateInputs = () => {
        const errors = {};

        // Validate contract_Name
        if (!newProduct.contract_Name) {
            errors.contract_Name = 'Please enter Contract Name';
        } else {
            // Kiểm tra độ dài và ký tự đặc biệt cho contract_Name
            const regexNameProduct = /^[\w\d\s\(\)\-]{2,50}$/;
            if (!regexNameProduct.test(newProduct.contract_Name)) {
                errors.contract_Name = 'Name Contract must be 2 to 50 characters and can only contain letters, numbers, spaces, "-", "(", and ")"';
            }
        }

        // Validate reason
        if (!newProduct.reason) {
            errors.reason = 'Please enter reason';
        } else {
            const regexReason = /^[a-zA-Z0-9\s\n\-,:\/.()]{2,1000}$/;
            if (!regexReason.test(newProduct.reason)) {
                errors.reason = 'reason must be 2 to 1000 characters and can only contain letters, numbers, spaces, newlines, and the following special characters: -, :, /, ., (, )';
            }
        }

        // Validate id_Type_Insurance
        if (!newProduct.id_Type_Insurance) {
            errors.id_Type_Insurance = 'Please select Type Insurance';
        }

        // Validate vat
        if (!newProduct.vat) {
            errors.vat = 'Please enter VAT';
        } else {
            const vat_Value = parseFloat(newProduct.vat);
            if (isNaN(vat_Value) || vat_Value < 10 || vat_Value > 100) {
                errors.vat = 'vat must be a number between 10% and 100%';
            }
        }

        // Validate limited_Years
        if (!newProduct.limited_Years) {
            errors.limited_Years = 'Please enter Limited Years';
        } else {
            const limited_Years_Value = parseFloat(newProduct.limited_Years);
            if (isNaN(limited_Years_Value) || limited_Years_Value < 0 || limited_Years_Value > 10) {
                errors.limited_Years = 'Limited Years must be a number between 0 to 10 years';
            }
        }

        // Validate level_Responsibility_For_People
        if (!newProduct.level_Responsibility_For_People) {
            errors.level_Responsibility_For_People = 'Please enter Level Responsibility For People';
        } else {
            const levelResponsibilityPeopleValue = parseFloat(newProduct.level_Responsibility_For_People);
            if (isNaN(levelResponsibilityPeopleValue) || levelResponsibilityPeopleValue < 0 || levelResponsibilityPeopleValue > 20000) {
                errors.level_Responsibility_For_People = 'Level Responsibility For People must be a number between 0$ and 20.000$';
            }
        }

        // Validate level_Responsibility_For_The_Property
        if (!newProduct.level_Responsibility_For_The_Property) {
            errors.level_Responsibility_For_The_Property = 'Please enter Level Responsibility For The Property';
        } else {
            const levelResponsibilityProperty = parseFloat(newProduct.level_Responsibility_For_The_Property);
            if (isNaN(levelResponsibilityProperty) || levelResponsibilityProperty < 0 || levelResponsibilityProperty > 20000) {
                errors.level_Responsibility_For_The_Property = 'Level Responsibility For The Property must be a number between 0$ and 20.000$';
            }
        }

        // Validate damages
        if (!newProduct.damages) {
            errors.damages = 'Please enter Damages';
        } else {
            const damagesValue = parseFloat(newProduct.damages);
            if (isNaN(damagesValue) || damagesValue < 0 || damagesValue > 100) {
                errors.damages = 'Damages must be a number between 0% and 100%';
            }
        }

        // Validate price
        if (!newProduct.price) {
            errors.price = 'Please enter Level Responsibility For The Property';
        } else {
            const priceValue = parseFloat(newProduct.price);
            if (isNaN(priceValue) || priceValue < 0 || priceValue > 20000) {
                errors.price = 'Price must be a number between 0$ and 20.000$';
            }
        }

        // Validate number_Of_Seats
        if (!newProduct.number_Of_Seats) {
            errors.number_Of_Seats = 'Please enter Level Responsibility For The Property';
        } else {
            const number_Of_SeatsValue = parseFloat(newProduct.number_Of_Seats);
            if (isNaN(number_Of_SeatsValue) || number_Of_SeatsValue < 0 || number_Of_SeatsValue > 50) {
                errors.number_Of_Seats = 'Seats must be a number between 0 and 50';
            }
        }

        // Validate payload
        if (newProduct.payload === undefined || newProduct.payload === null) {
            errors.payload = 'Please enter Level Responsibility For The Property';
        } else {
            const payloadValue = parseFloat(newProduct.payload);
            if (isNaN(payloadValue) || payloadValue < 0 || payloadValue > 50) {
                errors.payload = 'Seats must be a number between 0 and 50';
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
        newProduct.contract_Name,
        newProduct.reason,
        newProduct.id_Type_Insurance,
        newProduct.vat,
        newProduct.limited_Years,
        newProduct.level_Responsibility_For_People,
        newProduct.level_Responsibility_For_The_Property,
        newProduct.damages,
        newProduct.price,
        newProduct.number_Of_Seats,
        newProduct.payload,
    ]);



    const [searchTerm, setSearchTerm] = useState('');

    const [currentItems, setCurrentItems] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const filterAndPaginate = () => {
        let filteredProducts = products;

        // Filter by search term
        filteredProducts = filteredProducts.filter(item =>
            item.contract_Name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        //phân trang
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentItems = filteredProducts.slice(startIndex, endIndex);


        return { totalPages, currentItems };

    };


    useEffect(() => {
        setCurrentPage(1);
        const { totalPages, currentItems } = filterAndPaginate();
        setTotalPages(totalPages);
        setCurrentItems(currentItems);
    }, [searchTerm, products]);
    useEffect(() => {
        const { currentItems } = filterAndPaginate();
        setCurrentItems(currentItems);
    }, [currentPage]);


    async function handleDetailProduct(id) {
        try {
            const response = await axios.get(`http://localhost:5044/api/Product/${id}`);
            const productDetails = response.data;

            const typeInsuranceResponse = await axios.get(`http://localhost:5044/api/Type_Insurance/${productDetails.id_Type_Insurance}`);
            const typeInsuranceDetails = typeInsuranceResponse.data;
            // Display detailed information in a toast on the left side
            toast(
                <div>
                    <h1>{productDetails.contract_Name}</h1>
                    <hr />
                    <div className="row">
                        <div className="col-6">
                            <strong style={{ color: 'blue', }}>Type Insurance : </strong>
                            <span>{typeInsuranceDetails.type}</span>
                        </div>

                        <div className="col-6">
                            <strong style={{ color: 'blue', }}>Limited Years : </strong>
                            <span>{productDetails.limited_Years} Years</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <strong style={{ color: 'blue', }}>VAT : </strong>
                            <span>{productDetails.vat}%</span>
                        </div>

                        <div className="col-6">
                            <strong style={{ color: 'blue', }}>Damages : </strong>
                            <span>{productDetails.damages}%</span>
                        </div>

                        <div className="col-6">
                            <strong style={{ color: 'blue', }}>Price : </strong>
                            <span>{productDetails.price}$</span>
                        </div>
                    </div>

                    <hr />

                    <div className="row">
                        <div className="col-6">
                            <strong style={{ color: 'blue', }}>For People : </strong>
                            <span>{productDetails.level_Responsibility_For_People}</span>
                        </div>
                        <div className="col-6">
                            <strong style={{ color: 'blue', }}>For The Property : </strong>
                            <span>{productDetails.level_Responsibility_For_The_Property}</span>
                        </div>
                    </div>

                    <hr />

                    <div className="row">
                        <div className="col-6">
                            <strong style={{ color: 'blue', }}>Number Of Seats : </strong>
                            <span>{productDetails.number_Of_Seats}</span>
                        </div>
                        <div className="col-6">
                            <strong style={{ color: 'blue', }}>Payload : </strong>
                            <span>{productDetails.payload}</span>
                        </div>
                    </div>

                    <hr />

                    <div className="row">
                        <div className="col-12">
                            <strong style={{ color: 'blue', }}>Reason : </strong>
                            <span>{productDetails.reason}</span>
                        </div>
                    </div>




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
            <div class="col-lg-12 d-flex align-items-stretch">
                <div class="card w-100">
                    <button className='btn btn-outline-success' style={{ float: 'right' }} onClick={isAdding || isEditing ? handleCancel : () => setIsAdding(true)}>
                        {isAdding || isEditing ? 'Cancel' : 'Add new'}
                    </button>
                    {(isAdding || isEditing) && (
                        <div className="container mt-5 mb-3">
                            <form>

                                {isEditing && (
                                    <input type="hidden" className="form-control" id="barcode" value={newProduct.id_Product} onChange={(e) => setNewProduct({ ...newProduct, id_Product: e.target.value })} />
                                )}



                                <div className="row">
                                    <div className="mb-3 col-lg-6">
                                        <label htmlFor="contractName" className="form-label" style={{ float: 'left' }}>
                                            Contract Name
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${hasSubmitted && inputErrors.contract_Name && 'is-invalid'}`}
                                            id="contractName"
                                            value={newProduct.contract_Name}
                                            onChange={(e) => setNewProduct({ ...newProduct, contract_Name: e.target.value })}
                                            placeholder="Name of the contract here . . ."
                                        />
                                        {hasSubmitted && inputErrors.contract_Name && <div className="invalid-feedback">{inputErrors.contract_Name}</div>}
                                    </div>

                                    <div className="mb-3 col-lg-3">
                                        <label htmlFor="typeInsurance" className="form-label" style={{ float: 'left' }}>
                                            Type Insurance
                                        </label>
                                        <select
                                            className={`form-select ${hasSubmitted && inputErrors.id_Type_Insurance && 'is-invalid'}`}
                                            id="id_Type_Insurance"
                                            value={newProduct.id_Type_Insurance}
                                            onChange={(e) => setNewProduct({ ...newProduct, id_Type_Insurance: e.target.value })}
                                        >
                                            <option>Choose . . .</option>
                                            {typeOfInsuranceList.map((type) => (
                                                <option key={type.id_Type_Insurance} value={type.id_Type_Insurance}>
                                                    {type.type}
                                                </option>
                                            ))}
                                        </select>
                                        {hasSubmitted && inputErrors.id_Type_Insurance && (
                                            <div className="invalid-feedback">{inputErrors.id_Type_Insurance}</div>
                                        )}
                                    </div>

                                    <div className="mb-3 col-lg-3">
                                        <label htmlFor="vat" className="form-label">
                                            VAT
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control ${hasSubmitted && inputErrors.vat && 'is-invalid'}`}
                                            id="vat"
                                            value={newProduct.vat}
                                            onChange={(e) => setNewProduct({ ...newProduct, vat: e.target.value })}
                                            placeholder="Ex: 10%"
                                        />
                                        {hasSubmitted && inputErrors.vat && <div className="invalid-feedback">{inputErrors.vat}</div>}
                                    </div>

                                    <div className="mb-3 col-lg-2">
                                        <label htmlFor="limited_Years" className="form-label">
                                            Limited Years
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control ${hasSubmitted && inputErrors.limited_Years && 'is-invalid'}`}
                                            id="limited_Years"
                                            value={newProduct.limited_Years}
                                            onChange={(e) => setNewProduct({ ...newProduct, limited_Years: e.target.value })}
                                            placeholder="Ex: 2-3 years"
                                        />
                                        {hasSubmitted && inputErrors.limited_Years && <div className="invalid-feedback">{inputErrors.limited_Years}</div>}
                                    </div>

                                    <div className="mb-3 col-lg-5">
                                        <label htmlFor="responsibilityPeople" className="form-label">
                                            Level Responsibility For People
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control ${hasSubmitted && inputErrors.level_Responsibility_For_People && 'is-invalid'}`}
                                            id="level_Responsibility_For_People"
                                            value={newProduct.level_Responsibility_For_People}
                                            onChange={(e) => setNewProduct({ ...newProduct, level_Responsibility_For_People: e.target.value })}
                                            placeholder="Compensation for damage to people ($)"
                                        />
                                        {hasSubmitted && inputErrors.level_Responsibility_For_People && <div className="invalid-feedback">{inputErrors.level_Responsibility_For_People}</div>}
                                    </div>

                                    <div className="mb-3 col-lg-5">
                                        <label htmlFor="responsibilityProperty" className="form-label">
                                            Level Responsibility For The Property
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control ${hasSubmitted && inputErrors.level_Responsibility_For_The_Property && 'is-invalid'}`}
                                            id="level_Responsibility_For_The_Property"
                                            value={newProduct.level_Responsibility_For_The_Property}
                                            onChange={(e) => setNewProduct({ ...newProduct, level_Responsibility_For_The_Property: e.target.value })}
                                            placeholder="Compensation for damage to the property ($)"
                                        />
                                        {hasSubmitted && inputErrors.level_Responsibility_For_The_Property && <div className="invalid-feedback">{inputErrors.level_Responsibility_For_The_Property}</div>}
                                    </div>

                                    <div className="mb-3 col-lg-12">
                                        <label htmlFor="reason" className="form-label">
                                            Reason
                                        </label>
                                        <textarea
                                            className={`form-control ${hasSubmitted && inputErrors.reason && 'is-invalid'}`}
                                            id="reason"
                                            value={newProduct.reason}
                                            onChange={(e) => setNewProduct({ ...newProduct, reason: e.target.value })}
                                            placeholder="Reasons to buy this insurance . . ."
                                            rows={7}
                                        />
                                        {hasSubmitted && inputErrors.reason && <div className="invalid-feedback">{inputErrors.reason}</div>}
                                        <div style={{ textAlign: 'right', color: 'gray' }}>
                                            {newProduct.reason.length}/1000
                                        </div>
                                    </div>

                                    {/* <div className="mb-3 col-lg-12">
                                        <label htmlFor="reason" className="form-label">
                                            Reason
                                        </label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={newProduct.reason}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setNewProduct({ ...newProduct, reason: data });
                                            }}
                                            rows={7}
                                        />
                                        {inputErrors.reason && <div className="invalid-feedback">{inputErrors.reason}</div>}
                                    </div> */}

                                    <div className="mb-3 col-lg-3">
                                        <label htmlFor="damages" className="form-label">
                                            Damages
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control ${hasSubmitted && inputErrors.damages && 'is-invalid'}`}
                                            id="damages"
                                            value={newProduct.damages}
                                            onChange={(e) => setNewProduct({ ...newProduct, damages: e.target.value })}
                                            placeholder="Ex: 30%"
                                        />
                                        {hasSubmitted && inputErrors.damages && <div className="invalid-feedback">{inputErrors.damages}</div>}
                                    </div>

                                    <div className="mb-3 col-lg-3">
                                        <label htmlFor="price" className="form-label">
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control ${hasSubmitted && inputErrors.price && 'is-invalid'}`}
                                            id="price"
                                            value={newProduct.price}
                                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                            placeholder="$$$"
                                        />
                                        {hasSubmitted && inputErrors.price && <div className="invalid-feedback">{inputErrors.price}</div>}
                                    </div>

                                    <div className="mb-3 col-lg-3">
                                        <label htmlFor="number_Of_Seats" className="form-label">
                                            Number Of Seats
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control ${hasSubmitted && inputErrors.number_Of_Seats && 'is-invalid'}`}
                                            id="number_Of_Seats"
                                            value={newProduct.number_Of_Seats}
                                            onChange={(e) => setNewProduct({ ...newProduct, number_Of_Seats: e.target.value })}
                                            placeholder="Number Of Seats"
                                        />
                                        {hasSubmitted && inputErrors.number_Of_Seats && <div className="invalid-feedback">{inputErrors.number_Of_Seats}</div>}
                                    </div>

                                    <div className="mb-3 col-lg-3">
                                        <label htmlFor="payload" className="form-label">
                                            Payload
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control ${hasSubmitted && inputErrors.payload && 'is-invalid'}`}
                                            id="payload"
                                            value={newProduct.payload}
                                            onChange={(e) => setNewProduct({ ...newProduct, payload: e.target.value })}
                                            placeholder="Payload"
                                        />
                                        {hasSubmitted && inputErrors.payload && <div className="invalid-feedback">{inputErrors.payload}</div>}
                                    </div>

                                </div>
                                <button type="button" className="btn btn-primary mt-3" style={{ float: 'right', width: '100%' }} onClick={isEditing ? handleUpdateProduct : handleAddProduct}>
                                    {isEditing ? 'Update' : 'Submit'}
                                </button>

                            </form>
                        </div>
                    )}

                    <div className='m-3 row'>
                        <div className='col-lg-12'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Search by address'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>


                    <div class="card-body p-4">


                        <h5 class="card-title fw-semibold mb-4">Motorcycle Completed Contract Tables</h5>
                        {/* phân trang */}
                        <div className="d-flex justify-content-between mt-3">
                            <div>
                                <button
                                    className="btn btn-primary me-2"
                                    onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                            <div>
                                Page {currentPage} of {totalPages}
                            </div>
                        </div>
                        <div class="row mt-4">
                            {
                                currentItems.length > 0 ? (
                                    currentItems.map((item, index) => (
                                        <div className="col-lg-6" key={index}>
                                            <div className="card">
                                                <div className="card-body row">
                                                    <h5 className="card-title fw-semibold mb-3">Contract #{item.id_Product}</h5>
                                                    <p className="card-text col-lg-9">
                                                        <strong>Contract Name:</strong> {item.contract_Name}
                                                    </p>
                                                    <p className="card-text col-lg-3">
                                                        <strong>VAT:</strong> {item.vat}%
                                                    </p>
                                                    <p className="card-text col-lg-8" style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, lineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                                        <strong>Type Insurance:</strong> {idToInsuranceName[item.id_Type_Insurance]}
                                                    </p>

                                                    <p className="card-text col-lg-4">
                                                        <strong>Limited:</strong> {item.limited_Years} years
                                                    </p>
                                                    <p className="card-text">
                                                        <strong>Level Responsibility For People:</strong> {item.level_Responsibility_For_People}$
                                                    </p>
                                                    <p className="card-text">
                                                        <strong>Level Responsibility For The Property:</strong> {item.level_Responsibility_For_The_Property}$
                                                    </p>
                                                    <p className="card-text" style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, lineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                                        <strong>Reason:</strong> {item.reason}
                                                    </p>
                                                    <p className="card-text">
                                                        <strong>Damages:</strong> {item.damages}%
                                                    </p>
                                                    <div className="d-flex justify-content-end">
                                                        <button
                                                            className="btn btn-danger me-2"
                                                            onClick={() => {
                                                                const shouldDelete = window.confirm("Are You Sure?");
                                                                if (shouldDelete) {
                                                                    handleDeleteProduct(item.id_Product);
                                                                    handleCancel();
                                                                }
                                                            }}
                                                        >
                                                            Delete
                                                        </button>
                                                        <button className="btn btn-warning" onClick={() => handleEditProduct(item.id_Product)}>
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="btn btn-info ms-2"
                                                            onClick={() => handleDetailProduct(item.id_Product)}
                                                        >
                                                            Detail
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p style={{ color: 'red' }}>Chưa có sản phẩm.</p>
                                )
                            }



                        </div>
                    </div>





                </div>
            </div>
        </div>
    );
}

export default ProductList;