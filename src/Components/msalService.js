import { msalInstance } from "..";
import { appRoles } from "./msalConfig";

export function canBid()
{
    const set= new Set(['Bid_DD','Bid_DC','Bid_NC','Bid_GD','Bid_NS']);
const arr=msalInstance.getActiveAccount().idTokenClaims.roles;

for( let i=0;i<arr.length;i++)
{
    if (set.has(arr[i]))
    return true;
}
return false || canDeveloper();
}

export function canWatch()
{
    const set= new Set(['Watch','Watch_DD','Watch_DC','Watch_NC','Watch_GD','Watch_NS']);
const arr=msalInstance.getActiveAccount().idTokenClaims.roles;

for(let i=0;i<arr.length;i++)
{
    if (set.has(arr[i]))
    return true;
}
return false || canDeveloper();
}
export function canBackOrder()
{
const arr=msalInstance.getActiveAccount().idTokenClaims.roles;

for(let i=0;i<arr.length;i++)
{
    if (arr.includes(appRoles.BackOrder))
    return true;
}
return false || canDeveloper();
}

export function canCloseOut()
{
const arr=msalInstance.getActiveAccount().idTokenClaims.roles;

for(let i=0;i<arr.length;i++)
{
    if (arr.includes(appRoles.CloseOut))
    return true;
}
return false || canDeveloper();
}
export function canBidDD()
{
const arr=msalInstance.getActiveAccount().idTokenClaims.roles;

for(let i=0;i<arr.length;i++)
{
    if (arr.includes("Bid_DD"))
    return true;
}
return false || canDeveloper();
}

export function canBidDC()
{
const arr=msalInstance.getActiveAccount().idTokenClaims.roles;

for(let i=0;i<arr.length;i++)
{
    if (arr.includes("Bid_DC"))
    return true;
}
return false || canDeveloper();
}

export function canBidGD()
{
const arr=msalInstance.getActiveAccount().idTokenClaims.roles;

for(let i=0;i<arr.length;i++)
{
    if (arr.includes(appRoles.Bid_GD))
    return true;
}
return false || canDeveloper();
}

export function canBidNC()
{
const arr=msalInstance.getActiveAccount().idTokenClaims.roles;

for( let i=0;i<arr.length;i++)
{
    if (arr.includes("Bid_NC"))
    return true;
}
return false || canDeveloper();
}

export function canBidNS()
{
const arr=msalInstance.getActiveAccount().idTokenClaims.roles;

for(let i=0;i<arr.length;i++)
{
    if (arr.includes("Bid_NS"))
    return true;
}
return false || canDeveloper();
}
export function canBidDDLive()
{
const arr=msalInstance.getActiveAccount().idTokenClaims.roles;

for(let i=0;i<arr.length;i++)
{
    if (arr.includes(appRoles.Live_Bid_DD))
    return true;
}
return false || canDeveloper();
}

export function canBidDCLive()
{
const arr=msalInstance.getActiveAccount().idTokenClaims.roles;

for(let i=0;i<arr.length;i++)
{
    if (arr.includes(appRoles.Live_Bid_DC))
    return true;
}
return false || canDeveloper();
}

export function canBidGDLive()
{
const arr=msalInstance.getActiveAccount().idTokenClaims.roles;

for(let i=0;i<arr.length;i++)
{
    if (arr.includes(appRoles.Live_Bid_GD))
    return true;
}
return false || canDeveloper();
}

export function canBidNCLive()
{
const arr=msalInstance.getActiveAccount().idTokenClaims.roles;

for( let i=0;i<arr.length;i++)
{
    if (arr.includes(appRoles.Live_Bid_NC))
    return true;
}
return false || canDeveloper();
}

export function canBidNSLive()
{
const arr=msalInstance.getActiveAccount().idTokenClaims.roles;

for(let i=0;i<arr.length;i++)
{
    if (arr.includes(appRoles.Live_Bid_NS))
    return true;
}
return false || canDeveloper();
}
export function canWatchDD()
{
const arr=msalInstance.getActiveAccount().idTokenClaims.roles;

for(let i=0;i<arr.length;i++)
{
    if (arr.includes("Watch_DD"))
    return true;
}
return false || canDeveloper();
}

export function canWatchDC()
{
const arr=msalInstance.getActiveAccount().idTokenClaims.roles;

for(let i=0;i<arr.length;i++)
{
    if (arr.includes("Watch_DC"))
    return true;
}
return false || canDeveloper();
}

export function canWatchGD()
{
const arr=msalInstance.getActiveAccount().idTokenClaims.roles;

for(let i=0;i<arr.length;i++)
{
    if (arr.includes("Watch_GD"))
    return true;
}
return false || canDeveloper();
}

export function canWatchNC()
{
const arr=msalInstance.getActiveAccount().idTokenClaims.roles;

for(let i=0;i<arr.length;i++)
{
    if (arr.includes("Watch_NC"))
    return true;
}
return false || canDeveloper();
}

export function canWatchNS()
{
const arr=msalInstance.getActiveAccount().idTokenClaims.roles;

for(let i=0;i<arr.length;i++)
{
    if (arr.includes("Watch_NS"))
    return true;
}
return false || canDeveloper();
}

export function canWatchLive()
{
const arr=msalInstance.getActiveAccount().idTokenClaims.roles;

for(let i=0;i<arr.length;i++)
{
    if (arr.includes(appRoles.Live_Watch))
    return true;
}
return false || canWatch() || canDeveloper();
}
export function canReports()
{
const arr=msalInstance.getActiveAccount().idTokenClaims.roles;

for(let i=0;i<arr.length;i++)
{
    if (arr.includes(appRoles.Reports))
    return true;
}
return false || canDeveloper();
}

export function canAdmin()
{
    console.log(msalInstance.getActiveAccount())
const arr=msalInstance.getActiveAccount().idTokenClaims.roles;

for(let i=0;i<arr.length;i++)
{
    if (arr.includes(appRoles.Admin))
    return true;
}
return false;
}

export function canDeveloper()
{
    console.log(msalInstance.getActiveAccount())
const arr=msalInstance.getActiveAccount().idTokenClaims.roles;

for(let i=0;i<arr.length;i++)
{
    if (arr.includes(appRoles.Developer))
    return true;
}
return false;
}
export function canLive()
{
    return canWatchLive()||canBidDCLive()||canBidDDLive()||canBidNCLive()||canBidNSLive()||canBidGDLive() || canDeveloper();
}

export function canLiveDD()
{
    return canWatchLive()||canBidDDLive()|canBidDD() || canDeveloper();
}
export function canLiveDC()
{
    return canWatchLive()||canBidDCLive()|canBidDC() || canDeveloper();
}

export function canLiveGD()
{
    return canWatchLive()||canBidGDLive()||canBidGD() || canDeveloper();
}

export function canLiveNC()
{
    return canWatchLive()||canBidNCLive()|canBidNC() || canDeveloper();
}

export function canLiveNS()
{
    return canWatchLive()||canBidNSLive()|canBidNS() || canDeveloper();
}
export function canAuction()
{
    return canBid()||canWatch() || canDeveloper();
}