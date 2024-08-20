import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ExpenseCompany from './components/components_mini/ExpenseCompany';

function ExpenseAdminPage(props) {
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
                        <ExpenseCompany />
                    </div>
                </div>


            </div>
        </div>
    );
}

export default ExpenseAdminPage;