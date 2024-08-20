import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CompanyAddress from './components/components_mini/CompanyAddress';

function CompanyAddressAdminPage(props) {
    return (
        <div>
        <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">
            <Sidebar />


            <div class="body-wrapper">
                {/* <!--  Header Start --> */}
                <Header />
                {/* <!--  Header End --> */}
                <br />
                <div class="container-fluid">
                    <CompanyAddress />
                </div>
            </div>


        </div>

    </div >
    );
}

export default CompanyAddressAdminPage;