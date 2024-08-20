import { useEffect, useState } from "react";

function Fact(props) {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [totalUser, setTotalUser] = useState(0);

    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                const response = await fetch('http://localhost:5044/api/Order');
                const orderData = await response.json();
    
                // Calculate total revenue for all orders
                const totalRevenue = orderData.reduce((total, order) => total + order.total, 0);
                const totalProduct = orderData.length;
    
                setTotalRevenue(totalRevenue);
                setTotalProduct(totalProduct);
            } catch (error) {
                console.error('Error fetching revenue data:', error);
            }
        };
    
        fetchRevenueData();

        const fetchUsersData = async () => {
            try {
                const response = await fetch('http://localhost:5044/api/Users');
                const UserData = await response.json();
    
                const totalUser = UserData.data.length;
    
                setTotalUser(totalUser);

            } catch (error) {
                console.error('Error fetching Users data:', error);
            }
        };
    
        fetchUsersData();

    }, []);
    return (
        <div>

            {/* <!-- Fact Start --> */}
            <div className="container-fluid bg-secondary py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 wow fadeIn" data-wow-delay=".1s">
                            <div className="d-flex counter">
                                <h1 className="me-3 text-primary counter-value">${totalRevenue.toFixed(2)}</h1>
                                <h5 className="text-white mt-1">Total revenue received by the company.</h5>
                            </div>
                        </div>
                        <div className="col-lg-4 wow fadeIn" data-wow-delay=".3s">
                            <div className="d-flex counter">
                                <h1 className="me-3 text-primary counter-value">{totalProduct}</h1>
                                <h5 className="text-white mt-1">Sold {totalProduct} products to the consumer market.</h5>
                            </div>
                        </div>
                        <div className="col-lg-4 wow fadeIn" data-wow-delay=".5s">
                            <div className="d-flex counter">
                                <h1 className="me-3 text-primary counter-value">{totalUser}</h1>
                                <h5 className="text-white mt-1">Thank you {totalUser} customers for trusting our company's contracts.</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Fact End --> */}






        </div>
    );
}

export default Fact;