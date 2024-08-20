import React, { useEffect, useState } from 'react';

const RevenueSummary = () => {
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                const response = await fetch('http://localhost:5044/api/Order');
                const orderData = await response.json();

                // Calculate total revenue for the current month
                const currentDate = new Date();
                const currentMonth = currentDate.getMonth();
                const currentYear = currentDate.getFullYear();

                const totalRevenueForMonth = orderData
                    .filter(order => {
                        const orderDate = new Date(order.dateFrom);
                        return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
                    })
                    .reduce((total, order) => total + order.total, 0);

                setTotalRevenue(totalRevenueForMonth);
            } catch (error) {
                console.error('Error fetching revenue data:', error);
            }
        };

        fetchRevenueData();
    }, []);


    return (
        <div>
            <div className="row align-items-center">
                <div className="col-12">
                    <h5 className="card-title fw-semibold">Total money for 1 month :</h5>
                    <div className="d-flex align-items-center mb-3">
                        <span className="me-1 rounded-circle bg-light-success round-20 d-flex align-items-center justify-content-center">
                            {totalRevenue > 0 ? (
                                <i className="ti ti-arrow-up-left text-success"></i>
                            ) : (
                                <i className="ti ti-arrow-down-right text-danger"></i>
                            )}
                        </span>
                        <p className="text-dark me-1 fs-3 mb-0">+${totalRevenue.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueSummary;
