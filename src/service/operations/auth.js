import { endpoints } from "../api";
import { apiConnector } from "../apiConnecter";

const {LOGIN_API} = endpoints;

export const loginUser = async (data) => {
    
    try {
        const response = await apiConnector("POST", LOGIN_API,data);
        console.log("login response", data);

    }
    catch (error) {
        console.log("Login RESPONSE  API ERROR....", error);
        
    }

}