import React from 'react';


import Header from './components/Header';
import Sidebar from './components/Sidebar';
import InsuranceList from './components/components_mini/InsuranceList';

function InsuranceAdminPage(props) {
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
                        <InsuranceList />
                    </div>
                </div>


            </div>

        </div >
    );
}

export default InsuranceAdminPage;