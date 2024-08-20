import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

function OrderDTO(props) {
    const { orderDTOs, token } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOption, setSelectedOption] = useState('All'); // Added state for the selected option
    const itemsPerPage = 6;

    // Function to filter orders based on the search term and handle pagination
    const filterAndPaginate = () => {
        let filteredOrders = orderDTOs;

        // Add filter by customer ID
        filteredOrders = filteredOrders.filter(item => item.cus_Id == token?.Cus_id);

        if (selectedOption === 'Expired insurance') {
            filteredOrders = filteredOrders.filter(item => new Date(item.dateTo) < new Date());
        } else if (selectedOption === 'Insurance has not expired') {
            filteredOrders = filteredOrders.filter(item => new Date(item.dateTo) >= new Date());
        } else if (selectedOption === 'Reserve') {
            filteredOrders = filteredOrders.filter(item => new Date(item.dateFrom) > new Date());
        }

        filteredOrders = filteredOrders.filter(item =>
            item.code_Order.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentItems = filteredOrders.slice(startIndex, endIndex);

        return { totalPages, currentItems };
    };



    useEffect(() => {
        setCurrentPage(1);
        const { totalPages, currentItems } = filterAndPaginate();
        setTotalPages(totalPages);
        setCurrentItems(currentItems);
    }, [searchTerm, orderDTOs, selectedOption]);

    useEffect(() => {
        const { currentItems } = filterAndPaginate();
        setCurrentItems(currentItems);
    }, [currentPage]);

    const [currentItems, setCurrentItems] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    return (
        <div style={{ paddingBottom: '200px' }}>
            <div className='m-5 row'>

                <div className='col-lg-10 mb-3'>
                    <div className='input-group'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Search by Contract Name'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className='col-lg-2 mb-3'>
                    <select
                        className="form-select"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        <option value='All'>All</option>
                        <option value='Expired insurance' style={{ color: 'red' }}>Expired insurance</option>
                        <option value='Insurance has not expired' style={{ color: 'green' }}>Insurance has not expired</option>
                        <option value='Reserve' style={{ color: 'blue' }}>Reserve</option>
                    </select>
                </div>

                {/* phân trang */}
                <div className="d-flex justify-content-between mb-5">
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

                {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                        <div className="col-lg-6" key={index}>
                            <div className="card">
                                <div className="card-body row">
                                    <h5 className="card-title fw-semibold mb-3">Contract #{item.id}</h5>
                                    <p className="card-text col-lg-12">
                                        <strong>Code Order:</strong> {item.code_Order}
                                    </p>
                                    <p className="card-text col-lg-6">
                                        <strong>Contract Name:</strong> {item.type_Insurance}
                                    </p>
                                    <p className="card-text col-lg-6">
                                        <strong>Name Of Vehicle Owner:</strong> {item.name_Of_Vehicle_Owner}
                                    </p>
                                    <p className="card-text col-lg-6">
                                        <strong>Date From:</strong> {item.dateFrom}
                                    </p>
                                    <p className="card-text col-lg-6">
                                        <strong>Date To:</strong> {item.dateTo}
                                    </p>

                                    <a
                                        className="btn btn-primary"
                                        href={`/orderDetail/${item.code_Order}`}>
                                        Detail
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ color: 'red' }}>There are no orders yet.</p>
                )}
            </div>
        </div>
    );
}

export default OrderDTO;