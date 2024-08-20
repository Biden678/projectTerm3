import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


// tạo chức năng context, tạo thư viện
const AuthContext = createContext();

// tạo nhà cung cấp < kẹp thằng nào thì thằng đó hưởng các chức năng AuthProvider có >
function AuthProvider({ children }) {
    // const storeUser = localStorage.getItem("user");
    // const [user, setUser] = useState(JSON.parse(storeUser) || {});

    const navigate = useNavigate();
    const [customerRank, setCustomerRank] = useState('Bronze');


    const [products, setProducts] = useState([]);
    async function handleFetchProducts() {
        try {
            const data = await axios.get("http://localhost:5044/api/Product");
            if (data.status === 200) {
                setProducts(data.data);
            }
        } catch (error) {
            console.log("Something Wrong:", error);
        }
    }
    const [expenses, setExpenses] = useState([]);
    async function handleFetchExpenses() {
        try {
            const data = await axios.get("http://localhost:5044/api/Expense");
            if (data.status === 200) {
                setExpenses(data.data);
            }
        } catch (error) {
            console.log("Something Wrong:", error);
        }
    }

    const [areas, setAreas] = useState([]);
    async function handleFetchAreas() {
        try {
            const data = await axios.get("http://localhost:5044/api/Area");
            if (data.status === 200) {
                setAreas(data.data);
            }
        } catch (error) {
            console.log("Something Wrong:", error);
        }
    }

    const [addresses, setAddresses] = useState([]);
    async function handleFetchAddresses() {
        try {
            const data = await axios.get("http://localhost:5044/api/Address");
            if (data.status === 200) {
                setAddresses(data.data);
            }
        } catch (error) {
            console.log("Something Wrong:", error);
        }
    }


    const [orderDTOs, setOrderDTOs] = useState([]);
    async function handleFetchOrderDTOs() {
        try {
            const data = await axios.get("http://localhost:5044/api/OrderDTO");
            if (data.status === 200) {
                setOrderDTOs(data.data); // Fix this line
            }
        } catch (error) {
            console.log("Something Wrong:", error);
        }
    }

    const [orders, setOrders] = useState([]);
    async function handleFetchOrders() {
        try {
            const data = await axios.get("http://localhost:5044/api/Order");
            if (data.status === 200) {
                setOrders(data.data); // Fix this line
            }
        } catch (error) {
            console.log("Something Wrong:", error);
        }
    }


    const [insurances, setInsurances] = useState([]);
    async function handleFetchInsurances() {
        try {
            const data = await axios.get("http://localhost:5044/api/Type_Insurance");

            if (data.status === 200) {
                setInsurances(data.data);
            }
        } catch (error) {
            console.log("Something Wrong:", error);
        }
    }

    const [selectedIdInsuranceType, setSelectedIdInsuranceType] = useState(null);

    const [newOrder, setNewOrder] = useState({
        "id": 0, "type_Insurance": '', "cus_Id": '',

        "number_Of_Seats": '', "payload": '',

        "licensePlates": '', "chassisNumber": '', "engineNumber": '', "price": '', "vat": '',

        "dateFrom": '', "dateTo": '', "duration": '',

        "level_Responsibility_For_People": '', "level_Responsibility_For_The_Property": '',

        "name_Of_Vehicle_Owner": '', "vehicle_Owner_Address": '',

        "phone": '', "cmnd": '', "vehicle_Owner_Tax_Code": '',

        "total": '',
    });



    useEffect(() => {
        // Fetch data here or perform any other actions based on the id parameter
        handleFetchProducts();
        handleFetchInsurances();
    }, []);


    //login
    const tokenLocal = localStorage.getItem("token");
    const [statusLogin, setStatusLogin] = useState(true);

    const [token, setToken] = useState(tokenLocal ? jwtDecode(tokenLocal) : null)

    const login = (tokenString) => {
        localStorage.setItem("token", tokenString);
        const decodedToken = jwtDecode(tokenString);
        setToken(decodedToken);
        setStatusLogin(true);

        if (decodedToken.Status === "2" && decodedToken.Role === "User") {
            navigate("/");
            setToken(tokenString);

            
        }
        else if (decodedToken.Status === "0") {

            toast('😞 Your account is not verified', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    
    

    const [statusLoginAdmin, setStatusLoginAdmin] = useState(true);
    const tokenLocalAdmin = localStorage.getItem("tokenAdmin");
    const [tokenAdmin, setTokenAdmin] = useState(tokenLocalAdmin?jwtDecode(tokenLocalAdmin):null)
    const loginAdmin = (tokenString) => {
        
        localStorage.setItem("tokenAdmin", tokenString);
        const decodedToken = jwtDecode(tokenString);
        setTokenAdmin(decodedToken);
        if (decodedToken.Role==="User") {
            toast('😡 You are not authorized ⛔', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                logout();
        }
        else if(decodedToken.Role!=="User"){
            setStatusLoginAdmin(true);
            navigate('/HomeAdminPage');
            setTokenAdmin(tokenString);
            console.log("tokenAdmin alo alo alo",tokenAdmin);
        }
    }





    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
        setStatusLogin(false);
        setCustomerRank('Bronze');
        // Clear customer-related information
        setOrderDTOs([]);
        setOrders([]);
        setInsurances([]);
        setNewOrder({
            "id": 0, "type_Insurance": '', "cus_Id": '',

            "number_Of_Seats": '', "payload": '',
    
            "licensePlates": '', "chassisNumber": '', "engineNumber": '', "price": '', "vat": '',
    
            "dateFrom": '', "dateTo": '', "duration": '',
    
            "level_Responsibility_For_People": '', "level_Responsibility_For_The_Property": '',
    
            "name_Of_Vehicle_Owner": '', "vehicle_Owner_Address": '',
    
            "phone": '', "cmnd": '', "vehicle_Owner_Tax_Code": '',
    
            "total": '',
        });
    }


    const logoutAdmin = () => {
        localStorage.removeItem("tokenAdmin")
        setTokenAdmin(null)
        navigate("/loginadminpage")
        setStatusLoginAdmin(false)
    }



    // phuc
    // setStatusLogin(true);
    // setToken(null);

    const [users,setUsers] = useState([]);



    
    // bỏ hàng vô thùng
    const values = {
        handleFetchExpenses, setExpenses, expenses,
        navigate, customerRank, setCustomerRank,
        orderDTOs, setOrderDTOs, handleFetchOrderDTOs,
        orders, setOrders, handleFetchOrders,

        handleFetchProducts, products, setProducts,
        handleFetchAddresses, setAddresses, addresses,
        handleFetchAreas, areas, setAreas,
        handleFetchInsurances, insurances, setInsurances,
        newOrder, setNewOrder,
        //login
        token, statusLogin, login, logout, setStatusLogin,
        selectedIdInsuranceType, setSelectedIdInsuranceType,


        tokenAdmin,
        loginAdmin,logoutAdmin,
        users,setUsers
    }

    // bỏ thùng lên xe cb đem đi cung cấp
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthContext,
    AuthProvider
}