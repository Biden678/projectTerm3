import React, { useContext, useEffect } from 'react';
import '../css/style.css';
import '../css/bootstrap.min.css';
import '../lib/owlcarousel/assets/owl.carousel.min.css';
import '../lib/animate/animate.min.css';
import { AuthContext } from '../../contexts/AuthContext';


function Header(props) {
    const {
        handleFetchInsurances,
        insurances,
        token, logout, statusLogin,

        customerRank,setCustomerRank,orderDTOs,handleFetchOrderDTOs,

        // bảo trì
    } = useContext(AuthContext);


    useEffect(() => {
        handleFetchInsurances()
        handleFetchOrderDTOs();

        let filteredOrders = orderDTOs;
        filteredOrders = filteredOrders.filter(item => item.cus_Id == token?.Cus_Id);
    }, []);



    useEffect(() => {

        let filteredOrders = orderDTOs;
        // Add filter by customer ID
        filteredOrders = filteredOrders.filter(item => item.cus_Id == token?.Cus_Id);

        if (filteredOrders.length === 1) {
            setCustomerRank('Silver');
        } else if (filteredOrders.length >= 2 && filteredOrders.length < 4) {
            setCustomerRank('Gold');
        } else if (filteredOrders.length >= 4 && filteredOrders.length < 6) {
            setCustomerRank('Platinum');
        } else if (filteredOrders.length >= 7) {
            setCustomerRank('Diamond');
        }

    }, [orderDTOs]);


    const renderProfileLinks = () => {
        if (token && statusLogin) {
            return (
                <ul className="navbar-nav flex-row ms-auto align-items-center">
                    <li className="nav-item dropdown">
                        <a className="nav-link nav-icon-hover" href="javascript:void(0)" id="drop2" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <img src="https://i.pinimg.com/564x/eb/df/f1/ebdff1c41a3597fd4b98f5c7c04bdd3f.jpg" alt="" width="35" height="35" className="rounded-circle" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                            <div className="message-body">
                                <a href="/informationCustomer" className="d-flex align-items-center gap-2 dropdown-item">
                                    <i className="ti ti-user fs-6"></i>
                                    <p className="mb-0 fs-3">My Profile</p>
                                </a>
                                <a href="/order" className="d-flex align-items-center gap-2 dropdown-item">
                                    <i className="ti ti-list-check fs-6"></i>
                                    <p className="mb-0 fs-3">My Insurance</p>
                                </a>
                                <a href="/changePass" className="d-flex align-items-center gap-2 dropdown-item">
                                    <i className="ti ti-reload fs-6"></i>
                                    <p className="mb-0 fs-3">Change Pass</p>
                                </a>
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
                        <small className="me-3 text-white-50"><a href="#"></a>Rank : {customerRank?customerRank:""}</small>
                        <small className="me-3 text-white-50"><a href="#"><i className="fas fa-envelope me-2 text-secondary"></i></a>Email@Example.com</small>
                    </div>
                    <div id="note" className="text-secondary d-none d-xl-flex"><small>Note : We help you to Grow your Business</small></div>

                    <div className="top-link">
                        {token && statusLogin ? (
                            <>
                                <button onClick={logout} className="bg-light btn btn-xl-square">Logout</button>
                            </>
                        ) : (
                            <>
                                <a href="/signup" className="bg-light btn btn-xl-square" width="1000%">Sign Up</a>
                                <a href="/login" className="bg-light btn btn-xl-square" width="100%">Login</a>
                            </>
                        )}

                    </div>

                    {/* <div className="top-link">
                        <a href="" className="bg-light nav-fill btn btn-xl-square">Sigh Up</a>

                            <a href="" className="bg-light nav-fill btn btn-sm-square rounded-circle"><i className="fab fa-facebook-f text-primary"></i></a>
                            <a href="" className="bg-light nav-fill btn btn-sm-square rounded-circle"><i className="fab fa-twitter text-primary"></i></a>
                            <a href="" className="bg-light nav-fill btn btn-sm-square rounded-circle"><i className="fab fa-instagram text-primary"></i></a>
                            <a href="" className="bg-light nav-fill btn btn-sm-square rounded-circle me-0"><i className="fab fa-linkedin-in text-primary"></i></a>
                        </div> */}
                </div>
            </div>
        </div>
        {/* <!-- Topbar End --> */}

        {/* <!-- Navbar Start --> */}
        <div className="container-fluid bg-primary">
            <div className="container">
                <nav className="navbar navbar-dark navbar-expand-lg py-0">

                    <a href="/" className="navbar-brand">
                        <h1 className="text-white fw-bold d-block">Motor<span className="text-secondary">Insurance</span> </h1>
                    </a>
                    <button type="button" className="navbar-toggler me-0" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>



                    {renderProfileLinks()}





                    <div className="collapse navbar-collapse bg-transparent" id="navbarCollapse">
                        <div className="navbar-nav ms-auto mx-xl-auto p-0">

                            <a href="/" className="nav-item nav-link active text-secondary">Home</a>
                            <a href="/aboutPage" className="nav-item nav-link">About</a>
                            <a href="/" className="nav-item nav-link">Testimonials</a>
                            <a href="/" className="nav-item nav-link">SiteMap</a>
                            <a href="/" className="nav-item nav-link">Contact</a>
                            <div className="nav-item dropdown">
                                <a href="" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Insurances</a>
                                <div className="dropdown-menu rounded">

                                    {insurances.map((insurance, index) => (
                                        <a key={index} href={`/insurancesPage/${insurance.id_Type_Insurance}`} className="dropdown-item">
                                            {insurance.type}
                                        </a>
                                    ))}
                                    <a href="/insurancesTypePage" className="dropdown-item">All Insurances</a>

                                </div>
                            </div>

                            <a href="/changePass" className="nav-item nav-link">ChangePass</a>

                        </div>
                    </div>
                    {/* <div className="d-none d-xl-flex flex-shirink-0">
                            <div id="phone-tada" className="d-flex align-items-center justify-content-center me-4">
                                <a href="" className="position-relative animated tada infinite">
                                    <i className="fa fa-phone-alt text-white fa-2x"></i>
                                    <div className="position-absolute" style={{ top: -7, left: 20 }}>
                                        <span><i className="fa fa-comment-dots text-secondary"></i></span>
                                    </div>
                                </a>
                            </div>
               
                            <div className="d-flex flex-column border-end pe-4 ">
                                <span className="text-white-50">Have any questions?</span>
                                <span className="text-secondary">Call: + 0123 456 7890</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-center ms-4 ">
                                <a href="#"><i className="bi bi-search text-white fa-2x"></i> </a>
                            </div>
                        </div> */}
                </nav>
            </div>
        </div>
        {/* <!-- Navbar End --> */}


        {/* <!-- Back to Top --> */}
        <a href="#" className="btn btn-secondary btn-square rounded-circle back-to-top"><i className="fa fa-arrow-up text-white"></i></a>

    </div>
);
}

export default Header;