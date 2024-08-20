import React, { useContext } from 'react';
import '../assets/css/styles.min.css';
import '../assets/css/icons/tabler-icons/fonts/tabler-icons.svg';
import { AuthContext } from '../../contexts/AuthContext';

function Sidebar(props) {
    const{logoutAdmin} = useContext(AuthContext);
    const handleLogout = ()=>{
        logoutAdmin();
    }
    return (
        <div>
            {/* <!-- Sidebar Start --> */}
            <aside class="left-sidebar">
                {/* <!-- Sidebar scroll--> */}
                <div>
                    <div class="brand-logo d-flex align-items-center justify-content-between">
                        <div class="close-btn d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
                            <h1>Insurance Company</h1>
                        </div>
                    </div>
                    {/* <!-- Sidebar navigation--> */}
                    <nav class="sidebar-nav scroll-sidebar" data-simplebar="">
                        <ul id="sidebarnav">
                            <li class="nav-small-cap">
                                <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
                                <span class="hide-menu">Home</span>
                            </li>
                            <li class="sidebar-item">
                                <a class="sidebar-link" href="/HomeAdminPage" aria-expanded="false">
                                    <span>
                                        <i class="ti ti-layout-dashboard"></i>
                                    </span>
                                    <span class="hide-menu">Dashboard</span>
                                </a>
                            </li>


                            <hr />



                            <li class="nav-small-cap">
                                <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
                                <span class="hide-menu">Products</span>
                            </li>
                            <li class="sidebar-item">
                                <a class="sidebar-link" href="/insuranceAdmin" aria-expanded="false">
                                    <span>
                                        <i class="ti ti-file-description"></i>
                                    </span>
                                    <span class="hide-menu">Insurance</span>
                                </a>
                            </li>


                            <li class="sidebar-item">
                                <a class="sidebar-link" href="/contractAdmin" aria-expanded="false">
                                    <span>
                                        <i class="ti ti-cards"></i>
                                    </span>
                                    <span class="hide-menu">Contract</span>
                                </a>
                            </li>


                            <hr />




                            <li class="nav-small-cap">
                                <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
                                <span class="hide-menu">About Us</span>
                            </li>
                            <li class="sidebar-item">
                                <a class="sidebar-link" href="/areaAdmin" aria-expanded="false">
                                    <span>
                                        <i class="ti ti-mood-happy"></i>
                                    </span>
                                    <span class="hide-menu">Areas</span>
                                </a>
                            </li>


                            <li class="sidebar-item">
                                <a class="sidebar-link" href="/companyAdmin" aria-expanded="false">
                                    <span>
                                        <i class="ti ti-aperture"></i>
                                    </span>
                                    <span class="hide-menu">Company Addresses</span>
                                </a>
                            </li>


                            <hr />


                            <i class="ti ti-cards"></i>
                            <i class="ti ti-alert-circle"></i>
                            <i class="ti ti-cards"></i>
                            <i class="ti ti-file-description"></i>
                            <i class="ti ti-typography"></i>
                            <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <i class="ti ti-login"></i>
                            <i class="ti ti-user-plus"></i>
                            <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <i class="ti ti-mood-happy"></i>
                            <i class="ti ti-aperture"></i>
                            <button className="btn btn-outline-primary mx-3 mt-2 d-block" onClick={handleLogout}>Logout</button>
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