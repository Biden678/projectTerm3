import axios from "axios";
import { useState, createContext } from "react";


const AuthContextClaimDetail = createContext();

function AuthProviderClaimDetail({ children }) {
    const [claimDetails, setClaimDetails] = useState([]);
    async function handleFetchClaimDetails() {
        try {
            const response = await axios.get("http://localhost:5044/api/ClaimDetail/");
            if (response.status === 200) {
                setClaimDetails(response.data);
            }
        } catch (error) {
            console.log("Something Wrong:", error);
        }
    }
    const [claimLists, setClaimLists] = useState([]);

    async function handleFetchClaimLists() {
        try {
            const response = await axios.get("http://localhost:5044/api/ClaimList/");
            if (response.status === 200) {
                setClaimLists(response.data);
            }
        } catch (error) {
            console.log("Something Wrong:", error);
        }
    }

    const values = {
        claimDetails,
        setClaimDetails,
        handleFetchClaimDetails,
        claimLists,
        setClaimLists,
        handleFetchClaimLists

    };

    return (
        <AuthContextClaimDetail.Provider value={values}>
            {children}
        </AuthContextClaimDetail.Provider>
    );
}

export { AuthContextClaimDetail, AuthProviderClaimDetail };