import axios from "axios";

class api
{ key="8B8Y70UXd7o7D58A8rh7N829B629L9H8W9G7e7q9W8d";

getDetails(domain)
{
   return axios.get('https://api.dynadot.com/api3.json'/*,{ headers: {
"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept" }, params:{ key: this.key, command: "get_auction_details", domain : domain, currency : "usd"}}*/)
}

fetchDetailsdyna(domains)
{
   return axios.post('http://localhost:8080/fetchdetailsdyna',domains)
}

   fetchDetailsnc(domains)
{
   return axios.post('http://localhost:8080/fetchdetailsnc',domains)
}

fetchDetailsdc(domains)
{
   return axios.post('http://localhost:8080/fetchdetailsdc',domains)
}

getcurrauctions()
{
   return axios.get('http://localhost:8080/getcurrauctions');
}

getscheduledauctions()
{
   return axios.get('http://localhost:8080/getscheduledbids');
}

getplacedbids()
{
   return axios.get('http://localhost:8080/getplacedbids');
}

startLive()
{
   return axios.get('http://localhost:8080/startlive');
}

getLive()
{
   return axios.get('http://localhost:8080/detectlive');
}

getwatchlist()
{
   return axios.get('http://localhost:8080/getwatchlist');
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
   return axios.put('http://localhost:8080/watchlisted',arr);
}


getcompletedauctions()
{
   return axios.get('http://localhost:8080/getcompletedauctions');
}

getnotifs()
{
   return axios.get('http://localhost:8080/getnotifications');
}

sample()
{
   return axios.get('http://localhost:8080/sample');
}

schedulebiddc(ddlist)
{
return axios.post("http://localhost:8080/bulkbidscheduledc1",ddlist);
}

instantbiddc(ddlist)
{
return axios.post("http://localhost:8080/bulkbiddc",ddlist);
}

schedulebidnc(ddlist)
{
return axios.post("http://localhost:8080/bulkschedulenc",ddlist);
}

instantbidnc(ddlist)
{
return axios.post("http://localhost:8080/bulkbidnc",ddlist);
}

instantbidd(ddlist)
{
return axios.post("http://localhost:8080/bulkbidd",ddlist);
}

schedulebiddyna(ddlist)
{
return axios.post("http://localhost:8080/postDomains",ddlist);
}

instantbiddyna(ddlist)
{
return axios.post("http://localhost:8080/postDomainsinstant",ddlist);
}

}

export default new api();