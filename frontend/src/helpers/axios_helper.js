import axios from 'axios';
import {jwtDecode} from 'jwt-decode';


export const getAuthToken = () => {
    const cookieValue= document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth_token="))
    ?.split("=")[1];
    console.log("Cookie Value: ", cookieValue);
    return cookieValue;
};

export const getUserInfo = () => {
    const auth_token = getAuthToken();
    if (auth_token === null) {
        return {id: null, sub: null, email: null, role: null, exp: null};
    }
    try{
        return jwtDecode(getAuthToken());
    }catch (error) {
        console.error("Error decoding token:", error);
        return {id: null, sub: null, email: null, role: null, exp: null};
    }
}

export const setAuthHeader = (token) => {
    if (token !== null) {
      document.cookie = "auth_token="+token+"; path=/; samesite=none; max-age=43200; secure";
    } else {
      document.cookie = "auth_token=null; path=/; samesite=none; max-age=43200; secure";
    }
};

axios.defaults.baseURL = 'http://localhost:8080';

export const request = (method, url, data, navigate) => {
    let headers = {};
    if (!(data instanceof FormData)) {
        headers['Content-Type'] = 'application/json; charset=UTF-8';
    }

    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {'Authorization': `Bearer ${getAuthToken()}`};
    }
    
    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data
    })
   .then(response => {
        if(response === undefined){
            navigate("/error")
        }else{
            return response;
        }
    })
};