import React from 'react';
import Admin from './components/Admin';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function AdminPage(props) {
    return (
        <div>
        <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">
            <Sidebar />


            <div class="body-wrapper">
                {/* <!--  Header Start --> */}
                <Header/>
                {/* <!--  Header End --> */}
                <br/>
                <div class="container-fluid">
                    <Admin/>
                </div>
            </div>

        </div>

    </div >
 
    );
}

export default AdminPage;