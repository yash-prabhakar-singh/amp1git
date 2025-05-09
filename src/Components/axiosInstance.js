import axios, { Axios } from "axios";
import msalConfig, { appRoles, protectedResources } from "./msalConfig";
import { msalInstance } from "..";

const API_URL=process.env.REACT_APP_API_URL;

async function getToken() 
 {
   const currentAccount = msalInstance.getActiveAccount();
   const accessTokenRequest = {
     scopes: protectedResources.Api.scopes,
     account: currentAccount,
   };
 
   if (currentAccount) {
     if (currentAccount.tenantId == msalConfig.auth.tenantId) {
       
           const accessTokenResponse = await msalInstance.acquireTokenSilent(accessTokenRequest);
           return `Bearer ${accessTokenResponse.accessToken}`;              
       
     }
     return null;
   }
 }
                              
function axiosClient()
{        

const axiosInstance = axios.create({
    baseURL: API_URL,
   // 'http://localhost:88',
   responseType: "json",
   headers: { 
     accept: "application/json",
     "Content-Type": "application/json",
   },          
   timeout: 1000 * 60,
 });
 
 // Interceptor to add access token to every request
 axiosInstance.interceptors.request.use(async (config) => {//console.log("abc")
   const accessToken = await getToken(); // Retrieve the access token from where you store it
   console.log(accessToken);
   config.headers.Authorization = accessToken;
   return config;
 }, (error) => {
   return Promise.reject(error);
 });

 return axiosInstance;
}

const axiosInstance=axiosClient();
 export default axiosInstance;
