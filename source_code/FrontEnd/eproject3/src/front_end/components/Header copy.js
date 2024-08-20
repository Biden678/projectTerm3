import React, { useContext, useEffect, useState } from 'react';
import '../css/style.css';
import '../css/bootstrap.min.css';
import '../lib/owlcarousel/assets/owl.carousel.min.css';
import '../lib/animate/animate.min.css';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';


function Header(props) {
    const {
        handleFetchInsurances,
        insurances,
        token, logout, statusLogin,

        customerRank, setCustomerRank, orderDTOs, handleFetchOrderDTOs,

        // bảo trì
    } = useContext(AuthContext);

    const [rank, setRank] = useState([]);

    useEffect(() => {
        handleFetchInsurances()
        // function xxx() {
        //     handleFetchOrderDTOs();
        // }
        // xxx();
        // let filteredOrders = orderDTOs;
        // filteredOrders = filteredOrders.filter(item => item.cus_Id == token?.Cus_id);
        // setRank(filteredOrders)
        // console.log("rank 1",rank);

    }, []);



    // useEffect(() => {
    //     console.log("rank 2",rank);
    //     let filteredRank = rank;
    //     // Add filter by customer ID
    //     filteredRank = filteredRank.filter(item => item.cus_Id == token?.Cus_id);

    //     if (filteredRank.length === 1) {
    //         setCustomerRank('Silver');
    //     } else if (filteredRank.length >= 2 && filteredRank.length < 4) {
    //         setCustomerRank('Gold');
    //     } else if (filteredRank.length >= 4 && filteredRank.length < 6) {
    //         setCustomerRank('Platinum');
    //     } else if (filteredRank.length >= 7) {
    //         setCustomerRank('Diamond');
    //     }

    // }, [orderDTOs, token, setCustomerRank]);


    const renderProfileLinks = () => {
        if (token && statusLogin) {
            return (
                <ul className="navbar-nav flex-row ms-auto align-items-center">
                    <li className="nav-item dropdown">
                        <Link className="nav-link nav-icon-hover" to="javascript:void(0)" id="drop2" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <img src="https://i.pinimg.com/564x/eb/df/f1/ebdff1c41a3597fd4b98f5c7c04bdd3f.jpg" alt="" width="35" height="35" className="rounded-circle" />
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                            <div className="message-body">
                                <Link to="/informationCustomer" className="d-flex align-items-center gap-2 dropdown-item">
                                    <i className="ti ti-user fs-6"></i>
                                    <p className="mb-0 fs-3">My Profile</p>
                                </Link>
                                <Link to="/order" className="d-flex align-items-center gap-2 dropdown-item">
                                    <i className="ti ti-list-check fs-6"></i>
                                    <p className="mb-0 fs-3">My Insurance</p>
                                </Link>
                                <Link to="/changePass" className="d-flex align-items-center gap-2 dropdown-item">
                                    <i className="ti ti-reload fs-6"></i>
                                    <p className="mb-0 fs-3">Change Pass</p>
                                </Link>

                                <Link className="d-flex align-items-center gap-2 dropdown-item btn" onClick={logout}>
                                    <i className="ti ti-arrow-left fs-6"></i>
                                    <p className="mb-0 fs-3">Logout</p>
                                </Link>

                            </div>
                        </div>
                    </li>
                </ul>
            );
        }
    };

    return (
        <div>

            {/* <!-- Spinner Start --> */}
            {/* <div id="spinner" className="show position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
                <div className="spinner-grow text-primary" role="status"></div>
            </div> */}
            {/* <!-- Spinner End --> */}

            {/* <!-- Topbar Start --> */}
            <div className="container-fluid bg-dark py-2 d-none d-md-flex">
                <div className="container">
                    <div className="d-flex justify-content-between topbar">
                        <div className="top-info">
                            <small className="me-3 text-white-50"><Link to="#"></Link>Rank : {customerRank ? customerRank : ""}</small>
                            <small className="me-3 text-white-50"><Link to="#"><i className="fas fa-envelope me-2 text-secondary"></i></Link>Email@Example.com</small>
                        </div>
                        <div id="note" className="text-secondary d-none d-xl-flex"><small>Note : We help you to Grow your Business</small></div>

                        <div className="top-link">
                            {!token && (
                                <>
                                    <Link className="bg-light btn btn-xl-square" to="/signup">Sign Up</Link>
                                    <Link className="bg-light btn btn-xl-square" to="/login">Login</Link>
                                </>
                            )}

                        </div>

                        {/* <div className="top-link">
                        <Link to="" className="bg-light nav-fill btn btn-xl-square">Sigh Up</Link>

                            <Link to="" className="bg-light nav-fill btn btn-sm-square rounded-circle"><i className="fab fa-facebook-f text-primary"></i></Link>
                            <Link to="" className="bg-light nav-fill btn btn-sm-square rounded-circle"><i className="fab fa-twitter text-primary"></i></Link>
                            <Link to="" className="bg-light nav-fill btn btn-sm-square rounded-circle"><i className="fab fa-instagram text-primary"></i></Link>
                            <Link to="" className="bg-light nav-fill btn btn-sm-square rounded-circle me-0"><i className="fab fa-linkedin-in text-primary"></i></Link>
                        </div> */}
                    </div>
                </div>
            </div>
            {/* <!-- Topbar End --> */}

            {/* <!-- Navbar Start --> */}
            <div className="container-fluid bg-primary">
                <div className="container">
                    <nav className="navbar navbar-dark navbar-expand-lg py-0">

                        <Link to="/" className="navbar-brand">
                            <h1 className="text-white fw-bold d-block">Motor<span className="text-secondary">Insurance</span> </h1>
                        </Link>
                        <button type="button" className="navbar-toggler me-0" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>



                        {renderProfileLinks()}





                        <div className="collapse navbar-collapse bg-transparent" id="navbarCollapse">
                            <div className="navbar-nav ms-auto mx-xl-auto p-0">

                                <Link to="/" className="nav-item nav-link active text-secondary">Home</Link>
                                <div className="nav-item dropdown">
                                    <Link to="" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Insurances</Link>
                                    <div className="dropdown-menu rounded">

                                        {insurances.map((insurance, index) => (
                                            <Link key={index} to={`/insurancesPage/${insurance.id_Type_Insurance}`} className="dropdown-item">
                                                {insurance.type}
                                            </Link>
                                        ))}
                                        <Link to="/insurancesTypePage" className="dropdown-item">All Insurances</Link>

                                    </div>
                                </div>
                                <Link to="/aboutPage" className="nav-item nav-link">About</Link>
                                <Link to="/warrantyPolicy" className="nav-item nav-link">Testimonials</Link>

                            </div>
                        </div>

                    </nav>
                </div>
            </div>
            {/* <!-- Navbar End --> */}


            {/* <!-- Back to Top --> */}
            <Link to="#" className="btn btn-secondary btn-square rounded-circle back-to-top"><i className="fa fa-arrow-up text-white"></i></Link>

        </div>
    );
}

export default Header;