import AdminPage from "../back_end/AdminPage";
import AreaAdminPage from "../back_end/AreaAdminPage";
import CompanyAddressAdminPage from "../back_end/CompanyAddressAdminPage";
import ContactPage from "../back_end/ContactPage";
import ContractAdminPage from "../back_end/ContractAdminPage";
import DetailsWarrantyAdmin from "../back_end/DetailsWarrantyAdmin";
import ExpenseAdminPage from "../back_end/ExpenseAdminPage";
import HomeAdminPage from "../back_end/HomeAdminPage";
import InsuranceAdminPage from "../back_end/InsuranceAdminPage";
import LoginAdminPage from "../back_end/LoginAdminPage";
import UserPage from "../back_end/UserPage";
import WarrantyPolicyAdmin from "../back_end/WarrantyPolicyAdmin";
import AboutUsPage from "../front_end/AboutUsPage";
import ChangePassPage from "../front_end/ChangePassPage";
import ComingSoonPage from "../front_end/ComingSoonPage";
import ForgetPassPage from "../front_end/ForgetPass";
import HomePage from "../front_end/HomePage";
import InformationCustomerPage from "../front_end/InformationCustomerPage";
import InsurancesPage from "../front_end/InsurancesPage";
import InsurancesTypePage from "../front_end/InsurancesTypePage";
import LoginPage from "../front_end/LoginPage";
import OrderDTOpage from "../front_end/OrderDTOpage";
import OrderDetailPage from "../front_end/OrderDetailPage";
import ResetPassPage from "../front_end/ResetPassPage";
import SighUpPage from "../front_end/SighUpPage";
import SummaryInsurancePage from "../front_end/SummaryInsurancePage";
import WarrantyPolicy from "../front_end/WarrantyPolicy";
import VerifiedCus from "../front_end/components/VerifiedCus";
import WarrantyPolicyCustomer from "../front_end/components/components_body/WarrantyPolicyCustomer";

export const publicRouter = [
    {
        path:'/',
        component:<HomePage/>,
    },
    {
        path:'/login',
        component:<LoginPage/>,
    },
    {
        path:'/formProduct',
        component:<InsurancesPage/>,
    },
    {
        path:'/signUp',
        component:<SighUpPage/>,
    }, 
    {
        path:'/changePass',
        component:<ChangePassPage/>,
    },
    {
        path:'/informationCustomer',
        component:<InformationCustomerPage/>,
    },
    {
        path:'/aboutPage',
        component:<AboutUsPage/>,
    },
    {
        path: '/insurancesPage/:id',
        component: <InsurancesPage />,
    },
    {
        path:'/insurancesTypePage',
        component:<InsurancesTypePage/>,
    },
    
    {
        path:"/verifiedAccount/:cus_id",
        component:<VerifiedCus/>
    },
    {
        path:"/forgetpass",
        component:<ForgetPassPage/>
    },
    {
        path:"/reset-password/:cus_id",
        component:<ResetPassPage/>
    },
    {
        path: '/insuranceSummary',
        component: <SummaryInsurancePage />,
    },
    {
        path: '/order',
        component: <OrderDTOpage />,
    },
        {
        path: '/orderDetail/:code_Order_Params',
        component: <OrderDetailPage />,
    },
    {
        path: '/warrantyPolicy',
        component:<WarrantyPolicy />,
    },
    {
        path: '/comingSoon',
        component:<ComingSoonPage />,
    },
    //ADMIN
    {
        path:'/homeAdminPage',
        component:<HomeAdminPage/>,
    },
    {
        path:'/contractAdmin',
        component:<ContractAdminPage/>,
    },
    {
        path:'/insuranceAdmin',
        component:<InsuranceAdminPage/>,
    },
    {
        path:'/areaAdmin',
        component:<AreaAdminPage/>,
    },
    {
        path:'/companyAdmin',
        component:<CompanyAddressAdminPage/>,
    },
    {
        path:'/loginAdminPage',
        component:<LoginAdminPage/>,
    },
    {
        path:'/MangeUser',
        component:<UserPage/>
    } ,
       {
        path:'/ManageAdmin',
        component:<AdminPage/>
    },
    {
        path:'/manageContact',
        component:<ContactPage/>
    },
    {
        path:'/warrantyPolicyAdmin',
        component:<WarrantyPolicyAdmin/>,
    },
    {
        path:"/detailsWarrantyAdmin/:claimNumber",
        component:<DetailsWarrantyAdmin/>
    },
    {
        path:"/expense",
        component:<ExpenseAdminPage/>
    },

]
