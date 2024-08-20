import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthContext';

import Chart from 'chart.js/auto';

function ExpenseCompany(props) {
    const {
        handleFetchExpenses,
        setExpenses,
        expenses
    } = useContext(AuthContext);

    const [hasSubmitted, setHasSubmitted] = useState(false);



    const [newExpense, setNewExpense] = useState({ id: 0, dateOfExpense: '', typeOfExpense: '', amountOfExpense: '' });
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editExpenseId, setEditExpenseId] = useState(null);
    const [inputErrors, setInputErrors] = useState({ id: 0, dateOfExpense: '', typeOfExpense: '', amountOfExpense: '' });

    const [chartInstance, setChartInstance] = useState(null);


    // phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const [currentItems, setCurrentItems] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const filterAndPaginate = () => {
        let filteredExpense = expenses;

        filteredExpense = filteredExpense.sort((a, b) => new Date(b.dateOfExpense) - new Date(a.dateOfExpense));

        //phân trang
        const totalPages = Math.ceil(filteredExpense.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentItems = filteredExpense.slice(startIndex, endIndex);


        return { totalPages, currentItems };

    };


    useEffect(() => {
        setCurrentPage(1);
        const { totalPages, currentItems } = filterAndPaginate();
        setTotalPages(totalPages);
        setCurrentItems(currentItems);
    }, [expenses]);

    useEffect(() => {
        const { currentItems } = filterAndPaginate();
        setCurrentItems(currentItems);
    }, [currentPage]);




    useEffect(() => {
        handleFetchExpenses();
    }, []);


    const validateInputs = () => {
        let isValid = true;
        const errors = {};

        if (!newExpense.typeOfExpense.trim()) {
            errors.typeOfExpense = 'Expense is required';
            isValid = false;
        } else if (newExpense.typeOfExpense.length < 2 || newExpense.typeOfExpense.length > 30) {
            errors.typeOfExpense = 'Expense must be between 2 and 30 characters';
            isValid = false;
        } else if (!/^[a-zA-Z0-9 ]+$/.test(newExpense.typeOfExpense)) {
            errors.typeOfExpense = 'Expense cannot contain special characters';
            isValid = false;
        }

        // Validate dateOfExpense
        if (!newExpense.dateOfExpense) {
            errors.dateOfExpense = 'Date of Expense is required';
            isValid = false;
        }

        // Validate amountOfExpense
        if (!newExpense.amountOfExpense) {
            errors.amountOfExpense = 'Amount of Expense is required';
            isValid = false;
        } else if (isNaN(newExpense.amountOfExpense) || newExpense.amountOfExpense <= 0 || newExpense.amountOfExpense > 10000) {
            errors.amountOfExpense = 'Amount of Expense must be a valid number between 1 and 10000';
            isValid = false;
        }

        setInputErrors(errors);

        return isValid;
    };

    const handleCancel = () => {
        setIsAdding(false);
        setIsEditing(false);
        setEditExpenseId(null);

        setInputErrors({ id: 0, dateOfExpense: '', typeOfExpense: '', amountOfExpense: '' });
        setNewExpense({ id: 0, dateOfExpense: '', typeOfExpense: '', amountOfExpense: '' });

        setHasSubmitted(false);
    };

    const handleAddExpense = async () => {

        setHasSubmitted(true);

        try {
            const isValid = validateInputs();
            if (!isValid) {
                return;
            }

            await axios.post("http://localhost:5044/api/Expense", newExpense);

            const updatedData = await axios.get("http://localhost:5044/api/Expense");
            setExpenses(updatedData.data);

            setNewExpense({ id: 0, dateOfExpense: '', typeOfExpense: '', amountOfExpense: '' });
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
            console.log("Error adding new Expense:", error);
        }
    };

    const handleEditExpense = (id) => {
        const expenseToEdit = expenses.find(e => e.id === id);
        setEditExpenseId(id);
        setNewExpense({ ...newExpense, ...expenseToEdit });
        setIsEditing(true);
        setInputErrors({ id: 0, dateOfExpense: '', typeOfExpense: '', amountOfExpense: '' });

    };

    const handleUpdateExpense = async () => {

        setHasSubmitted(true);

        try {
            const isValid = validateInputs();
            if (!isValid) {
                return;
            }

            await axios.put(`http://localhost:5044/api/Expense`, newExpense);

            const updatedData = await axios.get("http://localhost:5044/api/Expense");
            setExpenses(updatedData.data);

            setEditExpenseId(null);
            setNewExpense({ id: 0, dateOfExpense: '', typeOfExpense: '', amountOfExpense: '' });
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
            console.log("Error updating Expense:", error);
        }
    };
    
    useEffect(() => {
        validateInputs();
        console.log("newExpense :", newExpense);
    }, [
        newExpense.typeOfExpense
    ]);



    const calculateMonthlyExpenses = () => {
        const monthlyExpenses = {};

        const sortedExpenses = expenses.sort((a, b) => new Date(b.dateOfExpense) - new Date(a.dateOfExpense));

        const latestExpenses = sortedExpenses.slice(0, 5);

        latestExpenses.forEach((expense) => {
            const expenseDate = new Date(expense.dateOfExpense);
            const year = expenseDate.getFullYear();
            const month = expenseDate.getMonth() + 1; // Months are zero-based

            const key = `${year}-${month}`;
            if (!monthlyExpenses[key]) {
                monthlyExpenses[key] = 0;
            }

            monthlyExpenses[key] += parseFloat(expense.amountOfExpense);
        });

        return monthlyExpenses;
    };

    const renderChart = (data) => {
        const ctx = document.getElementById('expenseChart').getContext('2d');

        // Destroy the existing chart instance if it exists
        if (chartInstance) {
            chartInstance.destroy();
        }

        // Create a new Chart instance
        const newChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(data),
                datasets: [{
                    label: 'Total Expenses',
                    data: Object.values(data),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        precision: 2,
                    },
                },
                indexAxis: 'y', // Đảo ngược trục x thành trục y
            },
        });

        setChartInstance(newChartInstance); // Save the new Chart instance
    };


    useEffect(() => {
        if (expenses.length > 0) {
            renderChart(calculateMonthlyExpenses());
        }
    }, [expenses]);


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
                                    <input type="hidden" className="form-control" id="barcode" value={newExpense.id} onChange={(e) => setNewExpense({ ...newExpense, id: e.target.value })} />
                                }
                                <div className='row'>
                                    <div className="mb-3 col-lg-12">
                                        <label htmlFor="typeOfExpense" className="form-label" style={{ float: 'left' }}>
                                            Expense
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${hasSubmitted && inputErrors.typeOfExpense ? 'is-invalid' : ''}`}
                                            id="typeOfExpense"
                                            value={newExpense.typeOfExpense}
                                            onChange={(e) => setNewExpense({ ...newExpense, typeOfExpense: e.target.value })}
                                        />
                                        {hasSubmitted && inputErrors.typeOfExpense && <div className="invalid-feedback">{inputErrors.typeOfExpense}</div>}
                                    </div>

                                    <div className="mb-3 col-lg-6">
                                        <label htmlFor="dateOfExpense" className="form-label" style={{ float: 'left' }}>
                                            Date of Expense
                                        </label>
                                        <input
                                            type="datetime-local"  // Use "datetime-local" for date and time input
                                            className={`form-control ${hasSubmitted && inputErrors.dateOfExpense ? 'is-invalid' : ''}`}
                                            id="dateOfExpense"
                                            value={newExpense.dateOfExpense}
                                            onChange={(e) => setNewExpense({ ...newExpense, dateOfExpense: e.target.value })}
                                        />
                                        {hasSubmitted && inputErrors.dateOfExpense && <div className="invalid-feedback">{inputErrors.dateOfExpense}</div>}
                                    </div>

                                    <div className="mb-3 col-lg-6">
                                        <label htmlFor="amountOfExpense" className="form-label" style={{ float: 'left' }}>
                                            Total ($)
                                        </label>
                                        <input
                                            type="number"  // Use "number" for numeric input
                                            className={`form-control ${hasSubmitted && inputErrors.amountOfExpense ? 'is-invalid' : ''}`}
                                            id="amountOfExpense"
                                            value={newExpense.amountOfExpense}
                                            onChange={(e) => setNewExpense({ ...newExpense, amountOfExpense: e.target.value })}
                                        />
                                        {hasSubmitted && inputErrors.amountOfExpense && <div className="invalid-feedback">{inputErrors.amountOfExpense}</div>}
                                    </div>
                                </div>

                                <button type="button" className="btn btn-primary" onClick={isEditing ? handleUpdateExpense : handleAddExpense}>
                                    {isEditing ? 'Update' : 'Submit'}
                                </button>
                            </form>
                        )}


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


                        <div className="table-responsive mt-3">
                            <table className="table text-nowrap mb-0 align-middle">
                                <thead className="text-dark fs-4">
                                    <tr>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">#</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Expense</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Amount</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Date</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Action</h6>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.typeOfExpense}</td>
                                            <td>{item.amountOfExpense}</td>
                                            <td>{item.dateOfExpense}</td>
                                            <td>


                                                <button className="btn btn-warning" onClick={() => handleEditExpense(item.id)}>
                                                    Edit
                                                </button>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <br />
                            <br />
                            <h2>Total Expenses by Month</h2>
                            <canvas id="expenseChart" width="400" height="200"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExpenseCompany;