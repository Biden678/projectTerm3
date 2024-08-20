import React, { useContext, useEffect } from 'react';
import '../assets/css/styles.min.css';
import '../assets/css/icons/tabler-icons/fonts/tabler-icons.svg';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

function Sidebar(props) {
    const { logoutAdmin, tokenAdmin, navigate } = useContext(AuthContext);
    const handleLogout = () => {
        logoutAdmin();
    }


    useEffect(() => {
        // Check if there is no token and redirect to the login page
        if (!tokenAdmin) {
            navigate('/loginadminpage');
        }
    }, [tokenAdmin, navigate]);

    return (
        <div>
            {/* <!-- Sidebar Start --> */}
            <aside className="left-sidebar">
                {/* <!-- Sidebar scroll--> */}
                <div>
                    <div className="brand-logo d-flex align-items-center justify-content-between">
                        <div className="close-btn d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
                            <h1>Insurance Company</h1>
                        </div>
                    </div>
                    {/* <!-- Sidebar navigation--> */}
                    <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                        <ul id="sidebarnav">
                            <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                <span className="hide-menu">Home</span>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/HomeAdminPage" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-layout-dashboard"></i>
                                    </span>
                                    <span className="hide-menu">Dashboard</span>
                                </Link>
                            </li>


                            <hr />



                            <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                <span className="hide-menu">Products</span>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/insuranceAdmin" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-file-description"></i>
                                    </span>
                                    <span className="hide-menu">Insurance</span>
                                </Link>
                            </li>


                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/contractAdmin" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-cards"></i>
                                    </span>
                                    <span className="hide-menu">Contract</span>
                                </Link>
                            </li>


                            <hr />




                            <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                <span className="hide-menu">About Us</span>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/areaAdmin" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-mood-happy"></i>
                                    </span>
                                    <span className="hide-menu">Areas</span>
                                </Link>
                            </li>

                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/companyAdmin" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-aperture"></i>
                                    </span>
                                    <span className="hide-menu">Company Addresses</span>
                                </Link>
                            </li>

                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/expense" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-aperture"></i>
                                    </span>
                                    <span className="hide-menu">Expense</span>
                                </Link>
                            </li>

                            <hr />




                            <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                <span className="hide-menu">Account</span>
                            </li>


                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/MangeUser" aria-expanded="false">
                                    <span>
                                        <i className="fa-solid fa-user"></i>
                                    </span>
                                    <span className="hide-menu">User</span>
                                </Link>
                            </li>



                            <li className="sidebar-item">
                                {tokenAdmin?.Role === "Admin" && <Link className="sidebar-link" to="/ManageAdmin" aria-expanded="false">
                                    <span>
                                        <i class="fa-solid fa-user-tie"></i>
                                    </span>
                                    <span className="hide-menu">Admin</span>
                                </Link>
                                }
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/manageContact" aria-expanded="false">
                                    <span>
                                        <i className="fa-regular fa-message"></i>
                                    </span>
                                    <span className="hide-menu">Contact</span>
                                </Link>
                            </li>



                            <hr />

                            <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                <span className="hide-menu">WPA</span>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/warrantyPolicyAdmin" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-file-description"></i>
                                    </span>
                                    <span className="hide-menu">Warranty Policy  </span>
                                </Link>
                            </li>

                            <i className="ti ti-cards"></i>
                            <i className="ti ti-alert-circle"></i>
                            <i className="ti ti-cards"></i>
                            <i className="ti ti-file-description"></i>
                            <i className="ti ti-typography"></i>
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <i className="ti ti-login"></i>
                            <i className="ti ti-user-plus"></i>
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <i className="ti ti-mood-happy"></i>
                            <i className="ti ti-aperture"></i>

                            <hr />
                            <button className="btn btn-outline-primary d-block" style={{ width: '100%' }} onClick={handleLogout}>Logout</button>

                        </ul>


                        <br />
                        <br />
                    </nav>
                    {/* <!-- End Sidebar navigation --> */}
                </div>
                {/* <!-- End Sidebar scroll--> */}
            </aside>
            {/* <!--  Sidebar End --> */}
        </div>
    );
}

export default Sidebar;