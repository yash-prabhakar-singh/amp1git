import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Ssubmit from './Components/submit';
import SignInSide from './Components/SignIn';
import { MsalProvider } from '@azure/msal-react';
import { EventType, PublicClientApplication } from '@azure/msal-browser';
import msalConfig, { protectedResources } from './Components/msalConfig';
import { syncUser } from './Components/api';
import { redirect, useNavigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
export const msalInstance= new PublicClientApplication(msalConfig)
//await msalInstance.initialize();
const initializeMsal = async () => {
  await msalInstance.initialize(); // Initialize MSAL instance

};

// initializeMsal();



// const accounts = msalInstance.getAllAccounts();
// if (accounts.length == 1) {
//   const account = accounts[0];
//   if (account?.tenantId === msalConfig.auth.tenantId) {
//     msalInstance.setActiveAccount(account);
//   }
// } else if (accounts.length > 1) {
//   accounts.forEach((account) => {
//     if (account?.tenantId === msalConfig.auth.tenantId) {
//       msalInstance.setActiveAccount(account);
//     }
//   });
// }

function loginRedirect() {
  try {
    const loginRequest = {
      scopes: protectedResources.Api.scopes,
    };
    msalInstance.loginRedirect(loginRequest);
  } catch (err) {
    console.log(err);
  }
}

function loginPopup() {
  try {
    const loginRequest = {
      scopes: protectedResources.Api.scopes,
    };
    msalInstance.loginPopup(loginRequest);
  } catch (err) {
    console.log(err);
  }
}

initializeMsal().then(async ()=>{ 
  const accounts = msalInstance.getAllAccounts();
if (accounts.length == 1) {
  const account = accounts[0];
  if (account?.tenantId === msalConfig.auth.tenantId) {
    msalInstance.setActiveAccount(account);
  }
} else if (accounts.length > 1) {
  accounts.forEach((account) => {
    if (account?.tenantId === msalConfig.auth.tenantId) {
      msalInstance.setActiveAccount(account);
    }
  });
}



msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload;
    const account = payload.account;
    msalInstance.setActiveAccount(account);
  } else if (event.eventType === EventType.ACQUIRE_TOKEN_FAILURE) {
    if (event.error?.name === "InteractionRequiredAuthError" && (window.location.pathname.startsWith(protectedResources.Api.path)||window.location.pathname.startsWith(protectedResources.Api.path1))) {
      loginRedirect();
    } else {
      console.log("ACQUIRE_TOKEN_FAILURE");
    }
  } else if (event.eventType === EventType.LOGIN_FAILURE) {
    if (event.error?.name === "BrowserAuthError" && (window.location.pathname.startsWith(protectedResources.Api.path)||window.location.pathname.startsWith(protectedResources.Api.path1))) {
      loginRedirect();
    } else {
      console.log("LOGIN FAILURE");
    }
  } else {
    console.log("Callback finished");
  }
});
await msalInstance
  .handleRedirectPromise()
  .then((tokenResponse) => {
    if (window.location.pathname.startsWith(protectedResources.Api.path)||window.location.pathname.startsWith(protectedResources.Api.path1)
    ) {

      const account = msalInstance.getActiveAccount();
      
      if (!account) {
        loginRedirect();
      }
      console.log(account)

      if(tokenResponse)
      {  
        syncUser().then((res)=>{console.log(res.data); window.location.reload()
        }).catch((err)=>{console.log(err); window.location.reload()});
      }
    }
    
  })
  .catch((err) => {
    console.log(err);
  });
root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance} >
    <App/>
    
    </MsalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
}).catch((err)=>{console.log(err);})
