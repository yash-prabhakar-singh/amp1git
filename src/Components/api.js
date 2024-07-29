import axiosInstance from "./axiosInstance";
//import axios from "axios";
const url="http://localhost:88";
 //url="https://23.235.218.118:88";
 //url="http://ded3450.inmotionhosting.com:88";
 //url="https://api.auctionhacker.com";i
 //url="http://api:8443";

 export const sample=()=>
{
   return axiosInstance.get(`/fetch123`);
}

export const getUsers=()=>
{
   return axiosInstance.get(`/users`);
}



export const getOtp=()=>
{
   return axiosInstance.get('/getotp')
}
export const getUser=()=>
{
   return axiosInstance.get('/getuser')
}

export const syncUser=()=>
{
   return axiosInstance.get('/syncuser')
}

export const cancelBidDd=(domain, auctionId)=>
{
   return axiosInstance.get(`/cancel/dd`,{params:{domain,auctionId}});
}

export const deleteUser=(id)=>
{
   return axiosInstance.get(`/deleteuser`,{params:{id}});
}


export const getLiveFilterSettings=()=>
{
return axiosInstance.get(`/getlivefilters`);
}


export const setLiveFilterSettings=(noHyphens,noNumbers,domainLength,text1,text2,text3,text4,text5,text6,text7,restrictedExts)=>
{
   let wrapper={noHyphens,noNumbers,domainLength,diff_exts_ests:[text1,text2,text3,text4,text5,text6],new_ests:text7,restrictedExts};
   console.log(wrapper);
return axiosInstance.post(`/postlivefilters`,wrapper);
}

export const getFastBidSettings=()=>
{
   return axiosInstance.get("/getfastbidsettings");
}

export const getAPIKeySettings=()=>
{
   return axiosInstance.get("/getapikeysettings");
}

export const setAPIKeySettings=(apiKeys)=>
{
   return axiosInstance.post("/postapikeysetting",apiKeys);
}

export const setFastBidSettings=(fastBid)=>
{
   return axiosInstance.post("/setfastbidsettings",fastBid);
}

export const cancelBidDc=(domain, auctionId)=>
{
   return axiosInstance.get(`/cancel/dc`,{params:{domain,auctionId}});
}

export const cancelBidNs=(domain, auctionId)=>
{
   return axiosInstance.get(`/cancel/ns`,{params:{domain,auctionId}});
}

export const cancelBidGd=(domain)=>
{
   return axiosInstance.get(`/cancel/gd`,{params:{domain}});
}

export const cancelBidNc=(domain,ncid)=>
{
   
   return axiosInstance.get(`/cancel/nc`,{params:{domain, ncid}});
}


export const getDetails=(domain)=>
{
   return axiosInstance.get('https://api.dynadot.com/api3.json',{ headers: {
"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept" }, params:{ key: this.key, command: "get_auction_details", domain : domain, currency : "usd"}})
}

export const fetchDetailsdyna=(domains,b)=>
{//fetchdetailsdyna
   let body={domains:domains,watch:b}
   return axiosInstance.post(`/fetchdetailsdyna`,body)
}

export const fetchDetailsns=(domains,b)=>
{//fetchdetailsdyna
   let body={domains:domains,watch:b}
   return axiosInstance.post(`/bulkfetchns`,body)
}

export const fetchDetailsEst=(ids)=>
{
   return axiosInstance.post(`/fetchwithest`,ids)
}

export const fetchgdv=(domains)=>
{
   return axiosInstance.post(`/getgdvs`,domains)
}

export const fetchest=(domains)=>
{
   return axiosInstance.post(`/bulkfetchest`,domains)
}


export const fetchDetailsgodaddy=(domains,b)=>
{let body={domains:domains,watch:b}
   return axiosInstance.post(`/bulkfetchgodaddy`,body)
}

export const fetchDetailscloseoutsgd=(domains)=>
{
   return axiosInstance.post(`/bulkfetchcloseoutsgodaddy`,domains)
}


export const fetchDetailsnc=(domains,b)=>
{let body={domains:domains,watch:b}
   return axiosInstance.post(`/fetchdetailsnc`,body)
}

export const fetchDetailsdc=(domains,b)=>
{let body={domains:domains,watch:b}
   return axiosInstance.post(`/fetchdetailsdc`,body)
}

export const getcurrauctions=()=>
{
   return axiosInstance.get(`/getcurrauctions`);
}

export const getscheduledauctions=()=>
{
   return axiosInstance.get(`/getscheduledbids`);
}
export const getscheduledcloseouts=()=>
{
   return axiosInstance.get(`/getscheduledcloseouts`);
}

export const getcompletedcloseouts=()=>
{
   return axiosInstance.get(`/getcompletedcloseouts`);
}
export const getplacedbids=()=>
{
   return axiosInstance.get(`/getplacedbids`);
}

export const startLive=()=>
{
   return axiosInstance.get(`/startlive`);
}

export const getLive=()=>
{
  return axiosInstance.get(`/detectlive`);
}
export const getLiveUpdated=()=>
{
  return axiosInstance.get(`/detectliveupdated`);
}
export const startLivenc=()=>
{
   return axiosInstance.get(`/startlivenc`);
}

export const getLivenc=()=>
{
   return axiosInstance.get(`/getlivenc`);
}

export const getLivedc=()=>
{
   return axiosInstance.get(`/getlivedc`);
}

export const getLivencUpdated=()=>
{
   return axiosInstance.get(`/getlivencupdated`);
}

export const getLivedcUpdated=()=>
{
   return axiosInstance.get(`/getlivedcupdated`);
}


export const getLivens=()=>
{
   return axiosInstance.get(`/getlivens`);
}
export const getLivegd=()=>
{
   return axiosInstance.get(`/getlivegd`);
}
export const getwatchlist=()=>
{
   return axiosInstance.get(`/getwatchlist`);
}
export const getwatchlistCloseout=()=>
{
   return axiosInstance.get(`/getWatchlistCloseouts`);
}

export const watchlist=(ids, rows)=>
{
   ids= ids.map((id)=>{return Number(id);})
   const set = new Set(ids);
   let all= rows.map((row)=> { return row.id})
   let nids = all.filter((al)=>{return !set.has(al)})
   console.log(ids)
   console.log(nids)
   const arr=[ids,nids];
   return axiosInstance.put(`/watchlisted`,arr);
}

export const watchlistSingle=(id)=>
{
   console.log(id); 
   return axiosInstance.get(`/watchlistsingle`,{params:{id}});
}

export const removeWatchlistSingle=(id)=>
{
   console.log(id); 
   return axiosInstance.get(`/removewatchlistsingle`,{params:{id}});
}

export const removeWatchlist=(ids)=>
{
   //console.log(ids); 
   ids= ids.map((id)=>{return Number(id);})
   return axiosInstance.put(`/removewatchlist`,ids);
}


export const watchlistcloseouts=(ids, rows)=>
{
   ids= ids.map((id)=>{return Number(id);})
   const set = new Set(ids);
   let all= rows.map((row)=> { return row.id})
   let nids = all.filter((al)=>{return !set.has(al)})
   console.log(ids)
   console.log(nids)
   const arr=[ids,nids];
   return axiosInstance.put(`/watchlistedcloseout`,arr);
}

export const removeCloseoutWatchlist=(ids)=>
{
   console.log(ids); 
   ids= ids.map((id)=>{return Number(id);})
   return axiosInstance.put(`/removecloseoutwatchlist`,ids);
}

export const getcompletedauctions=()=>
{
   return axiosInstance.get(`/getcompletedauctions`);
}

export const getnotifs=()=>
{
   return axiosInstance.get(`/getnotifications`);
}

export const getnotifstoday=()=>
{
   return axiosInstance.get(`/getnotificationstoday`);
}

export const getnotifsnew=(to,from,offSet,imp)=>
{
   return axiosInstance.get(`/getnotificationsnew`,{params:{to,from,offSet,imp}});
}

export const sample1=()=>
{
   return axiosInstance.get(`/sample`);
}

export const schedulebiddc=(ddlist)=>
{
return axiosInstance.post(`/bulkbidscheduledc1`,ddlist);
}

export const instantbiddc=(ddlist)=>
{
return axiosInstance.post(`/bulkbiddc`,ddlist);
}

export const schedulebidgd=(ddlist)=>
{
return axiosInstance.post(`/bulkbidschedulegodaddy`,ddlist);
}

export const instantbidgd=(ddlist)=>
{
return axiosInstance.post(`/bulkbidgodaddy`,ddlist);
}

export const schedulecloseoutgd=(closeout, price)=>
{
   let closeouts={closeout,price}
return axiosInstance.post(`/schedulegodaddycloseouts`,closeouts);
}

export const instantcloseoutgd=(closeout,price)=>
{
   let closeouts={closeout,price}
return axiosInstance.post(`/buygodaddycloseouts`,closeouts);
}
export const schedulecloseoutgd1=(closeouts)=>
{
return axiosInstance.post(`/schedulegodaddycloseouts1`,closeouts);
}

export const instantcloseoutgd1=(closeouts)=>
{
return axiosInstance.post(`/buygodaddycloseouts1`,closeouts);
}

export const schedulebidnc=(ddlist)=>
{
   return axiosInstance.post(`/bulkschedulenc`,ddlist);
}

export const instantbidnc=(ddlist)=>
{
return axiosInstance.post(`/bulkbidnc`,ddlist);
}

export const instantbidd=(ddlist)=>
{
return axiosInstance.post(`/bulkbidd`,ddlist);
}

export const schedulebiddyna=(ddlist)=>
{//postDomains
return axiosInstance.post(`/postDomains`,ddlist);
}

export const schedulebidns=(ddlist)=>
{//postDomains
return axiosInstance.post(`/bulkschedulens`,ddlist);
}

export const schedulebiddynasingle=(domain,auctionId,bid)=>
{
return axiosInstance.get(`/schedulesingledyna`,{params:{domain,auctionId ,bid}});
}
export const schedulebiddcsingle=(domain,auctionId,bid)=>
{
return axiosInstance.get(`/schedulesingledc`,{params:{domain,auctionId ,bid}});
}
export const schedulebidgdsingle=(domain,auctionId,bid)=>
{
return axiosInstance.get(`/schedulesinglegd`,{params:{domain,id:auctionId,price:bid}});
}
export const schedulebidncsingle=(domain,ncid,bid)=>
{
return axiosInstance.get(`/schedulesinglenc`,{params:{domain,ncid,bid}});
}
export const schedulebidnssingle=(domain,auctionId,bid)=>
{
return axiosInstance.get(`/schedulesinglens`,{params:{id:auctionId,domain,bid}});
}
export const instantbiddyna=(ddlist)=>
{
return axiosInstance.post(`/postDomainsinstant`,ddlist);
}
export const backorderstandard=(ddlist)=>
{
return axiosInstance.post(`/placebackorderstandard`,ddlist);
}

export const backorderdiscount=(ddlist)=>
{
return axiosInstance.post(`/placebackorderdiscount`,ddlist);
}
export const getTargetsHighest=()=>
{
return axiosInstance.get(`/gettargetshighest`);
}
;