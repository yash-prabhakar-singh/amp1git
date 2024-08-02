import { LogLevel } from "@azure/msal-browser";

const msalConfig = {
    auth: {
      clientId: '0f82a110-2f06-4ed1-8912-9b0231a46a5e',
      issuer: 'https://login.microsoftonline.com/eba2c098-631c-4978-8326-5d25c2d09ca5/v2.0',
      //issuer: 'https://sts.windows.net/eba2c098-631c-4978-8326-5d25c2d09ca5/',
      authority: 'https://login.microsoftonline.com/eba2c098-631c-4978-8326-5d25c2d09ca5',
      redirectUri://'https://amp-frontend.wittyground-fa4ba52b.eastus2.azurecontainerapps.io/home/tools/est',//'https://auctionhacker.com/home/tools/est',//
      'http://localhost:3000/home/tools/est',
      tenantId: 'eba2c098-631c-4978-8326-5d25c2d09ca5',
      strictDiscoveryDocumentValidation: false,
      postLogoutRedirectUri: "/",
    navigateToLoginRequestUrl: false
    },
    system: {
        tokenRenewalOffsetSeconds: 600,
        navigateFrameWait: 0,
        loggerOptions: {
          loggerCallback(logLevel, message) {
            console.log(message);
          },
        },
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true,
      },
       // Enable PKCE
  mode: 'redirect',
  interactionType: 'redirect',
  system: {
    loggerOptions: {
      
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};
  

 
export const protectedResources = {
  Api: {
    path: "/home",
    path1: "/m",
    scopes: ['openid','email','profile',"api://0f82a110-2f06-4ed1-8912-9b0231a46a5e/Files.Edit"
  ],
  },
};
export const appRoles = {
  Bid_GD: "Bid_GD",
  Bid_DD: "Bid_DD",
  Bid_DC: "Bid_DC",
  Bid_NS: "Bid_NS",
  Bid_NC: "Bid_NC",
  Watch: "Watch",
  Watch_GD: "Watch_GD",
  Watch_DD: "Watch_DD",
  Watch_DC: "Watch_DC",
  Watch_NS: "Watch_NS",
  Watch_NC: "Watch_NC",
  Reports: "Reports",
  Report_GD: "Report_GD",
  Report_DD: "Report_DD",
  Report_DC: "Report_DC",
  Report_NS: "Report_NS",
  Report_NC: "Report_NC",
  Live_Bid_GD: "Live_Bid_GD",
  Live_Bid_DD: "Live_Bid_DD",
  Live_Bid_DC: "Live_Bid_DC",
  Live_Bid_NS: "Live_Bid_NS",
  Live_Bid_NC: "Live_Bid_NC",
  Live_Watch: "Live_Watch",
  Live_Watch_GD: "Live_Watch_GD",
  Live_Watch_DD: "Live_Watch_DD",
  Live_Watch_DC: "Live_Watch_DC",
  Live_Watch_NS: "Live_Watch_NS",
  Live_Watch_NC: "Live_Watch_NC",
  CloseOut:"CloseOut",
  BackOrder:"BackOrder",
  Admin:"Admin",
  Developer:"Developer",
  Sample: "Sample",
};
  
  export default msalConfig;
  