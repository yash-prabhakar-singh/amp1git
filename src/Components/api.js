import axios from "axios";

class api
{ key="8B8Y70UXd7o7D58A8rh7N829B629L9H8W9G7e7q9W8d";

  url="http://localhost:8443";

getDetails(domain)
{
   return axios.get('https://api.dynadot.com/api3.json'/*,{ headers: {
"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept" }, params:{ key: this.key, command: "get_auction_details", domain : domain, currency : "usd"}}*/)
}

fetchDetailsdyna(domains)
{
   return axios.post(`${this.url}/fetchdetailsdyna`,domains)
}

fetchgdv(domains)
{
   return axios.post(`${this.url}/getgdvs`,domains)
}

fetchDetailsgodaddy(domains)
{
   return axios.post(`${this.url}/bulkfetchgodaddy`,domains)
}

fetchDetailscloseoutsgd(domains)
{
   return axios.post(`${this.url}/bulkfetchcloseoutsgodaddy`,domains)
}


   fetchDetailsnc(domains)
{
   return axios.post(`${this.url}/fetchdetailsnc`,domains)
}

fetchDetailsdc(domains)
{
   return axios.post(`${this.url}/fetchdetailsdc`,domains)
}

getcurrauctions()
{
   return axios.get(`${this.url}/getcurrauctions`);
}

getscheduledauctions()
{
   return axios.get(`${this.url}/getscheduledbids`);
}
getscheduledcloseouts()
{
   return axios.get(`${this.url}/getscheduledcloseouts`);
}

getcompletedcloseouts()
{
   return axios.get(`${this.url}/getcompletedcloseouts`);
}
getplacedbids()
{
   return axios.get(`${this.url}/getplacedbids`);
}

startLive()
{
   return axios.get(`${this.url}/startlive`);
}

getLive()
{
   return axios.get(`${this.url}/detectlive`);
}

startLivenc()
{
   return axios.get(`${this.url}/startlivenc`);
}

getLivenc()
{
   return axios.get(`${this.url}/getlivenc`);
}

getwatchlist()
{
   return axios.get(`${this.url}/getwatchlist`);
}

watchlist(ids, rows)
{
   ids= ids.map((id)=>{return Number(id);})
   const set = new Set(ids);
   let all= rows.map((row)=> { return row.id})
   let nids = all.filter((al)=>{return !set.has(al)})
   console.log(ids)
   console.log(nids)
   const arr=[ids,nids];
   return axios.put(`${this.url}/watchlisted`,arr);
}


getcompletedauctions()
{
   return axios.get(`${this.url}/getcompletedauctions`);
}

getnotifs()
{
   return axios.get(`${this.url}/getnotifications`);
}

sample()
{
   return axios.get(`${this.url}/sample`);
}

schedulebiddc(ddlist)
{
return axios.post(`${this.url}/bulkbidscheduledc1`,ddlist);
}

instantbiddc(ddlist)
{
return axios.post(`${this.url}/bulkbiddc`,ddlist);
}

schedulebidgd(ddlist)
{
return axios.post(`${this.url}/bulkbidschedulegodaddy`,ddlist);
}

instantbidgd(ddlist)
{
return axios.post(`${this.url}/bulkbidgodaddy`,ddlist);
}

schedulecloseoutgd(closeout, price)
{
   let closeouts={closeout,price}
return axios.post(`${this.url}/schedulegodaddycloseouts`,closeouts);
}

instantcloseoutgd(closeout,price)
{
   let closeouts={closeout,price}
return axios.post(`${this.url}/buygodaddycloseouts`,closeouts);
}

schedulebidnc(ddlist)
{
return axios.post(`${this.url}/bulkschedulenc`,ddlist);
}

instantbidnc(ddlist)
{
return axios.post(`${this.url}/bulkbidnc`,ddlist);
}

instantbidd(ddlist)
{
return axios.post(`${this.url}/bulkbidd`,ddlist);
}

schedulebiddyna(ddlist)
{
return axios.post(`${this.url}/postDomains`,ddlist);
}

instantbiddyna(ddlist)
{
return axios.post(`${this.url}/postDomainsinstant`,ddlist);
}

}

export default new api();