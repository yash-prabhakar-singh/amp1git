import logo from './logo.svg';
import './App.css';
import Ssubmit from './Components/submit';
import SignInSide from './Components/SignIn';
import { Navigate, Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './Components/Home';
import SingleBid from './Components/BulkFetch';
import CurrentBids from './Components/BiddingList';
import HistoryBids from './Components/AuctionsReport';
import Preferences from './Components/Preferences';
import Notifications from './Components/Notifications';
import BulkFetch from './Components/BulkFetch';
import BiddingList from './Components/BiddingList';
import WatchList from './Components/Watchlist';
import AuctionsReport from './Components/AuctionsReport';
import ProSidebar from './Components/ProSidebar';
import Proside from './Components/ProSidebar';
import Home1 from './Components/Home copy';
import Mbid from './Components/MultipleBid';
import Bulkf from './Components/BulkFetch copy';
import Live from './Components/DynadotLive';
import Bulkfetchcloseout from './Components/BulkFetchCloseouts';
import Mcloseouts from './Components/Multiplecloseoutsbuy';
import NamecheapLive from './Components/NamecheapLive';
import CloseoutList from './Components/CloseoutList';
import CloseoutsReport from './Components/CloseoutsReport';
import Bulkfgdv from './Components/BulkFetchGDV';
import AuthenticatedRoute from './Components/AuthenticatedRoute';
import Watchlistcloseouts from './Components/CloseoutsWatchlist';
import Apikeys from './Components/APIKeysSettings';
import WatchList1 from './Components/Watchlist copy';
import Bulkfest from './Components/BulkFetchEST';
import AuthenticatedRouteEst from './Components/AuthenticatedRouteEst';
import SignInEst from './Components/SignInEST';
import LiveSettings from './Components/LiveSettings';
import BulkOrders from './Components/BulkOrders';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { appRoles } from './Components/msalConfig';
import RouteGuard from './Components/Routegard';
import UsersList from './Components/UsersList';
import DCLive from './Components/DropcatchLive';
import GDLive from './Components/GDLive';
import NamesiloLive from './Components/NamesiloLive';
import Bulkfest1 from './Components/BulkFetchEST copy';
import Dashboard from "./MobileComponent/Dashboard";
import WatchtlistM from "./MobileComponent/WatchlistM";
import BulkFetchM from "./MobileComponent/BulkFetchM";
import Navigation from "./MobileComponent/Navigation";
import Liveplatforms from "./MobileComponent/Liveplatforms";
import BulkFGDVM from "./MobileComponent/BulkFGDVM";
import NotificationsM from "./MobileComponent/NotificationsM";
import ReportsM from "./MobileComponent/ReportsM";
import BidPage from "./MobileComponent/BidPage";
import Buy from "./MobileComponent/Buy";
import CloseoutsM from "./MobileComponent/CloseoutsM";
import MyPreferences from "./MobileComponent/MyPreferences";
import UserProfile from "./MobileComponent/UserProfile";
import BulkStats from './Components/BulkStats';
import LiveM from './MobileComponent/DynadotLiveM';
import DCLiveM from './MobileComponent/DropcatchLiveM';
import NamesiloLiveM from './MobileComponent/NamesiloLiveM';
import NamecheapLiveM from './MobileComponent/NamecheapLiveM';
import GDLiveM from './MobileComponent/GDLiveM';
import AlgoSettings from './Components/AlgoSettings';
import { SampleUI } from './Components/SampleFigma';
import PreferencesNew from './Components/PreferencesNew';
import CloseoutsReportWithFilter from './Components/CloseOutReportWithFilter';


function App() {
  return (
    <div className="App">
      <Router>
     <>
    
     <Routes>
     {//<Route path="/" exact element={<Navigate to="/home/tools/est"/>}/>
     }
     <Route path="/est/login" exact element={<SignInEst/>}/>
     <Route path="/sample" element={<SampleUI/>}/>

     <Route path="/est" exact element={<AuthenticatedRouteEst><Bulkfest/></AuthenticatedRouteEst>}>

      </Route>
      <Route path="/" exact element={<SignInSide/>}/>
      
     <Route path="/home1" exact element={<Home/>}/>
     <Route path="/home" element={<Home1/>}>

     <Route index element={<Bulkfest1 />} />
     <Route  path="bulkbid" exact element={<RouteGuard roles={[appRoles.Bid_GD,appRoles.Bid_DD,appRoles.Bid_DC,appRoles.Bid_NS,appRoles.Bid_NC,appRoles.Developer]}><Mbid/></RouteGuard>} />
     <Route path="users" exact element={<RouteGuard roles={[appRoles.Admin,appRoles.Developer]}><UsersList/></RouteGuard>} />

     <Route path="bulkorders" exact element={<RouteGuard roles={[appRoles.BackOrder,appRoles.Developer]}><BulkOrders /></RouteGuard>} />
          <Route path="bulkfetch" exact element={<RouteGuard roles={[appRoles.Watch,appRoles.Developer]}><Bulkf /></RouteGuard>} />
          <Route path="bulkfetchgdv" exact element={<Bulkfgdv />} />

          <Route path="closeouts/bulkfetch" exact element={<RouteGuard roles={[appRoles.CloseOut,appRoles.Developer]}><Bulkfetchcloseout /></RouteGuard>} />
          <Route path="closeouts/bulkbuy" exact element={<RouteGuard roles={[appRoles.CloseOut,appRoles.Developer]}><Mcloseouts /></RouteGuard>} />
          <Route path="biddinglist" element={<RouteGuard roles={[appRoles.Bid_GD,appRoles.Bid_DD,appRoles.Bid_DC,appRoles.Bid_NS,appRoles.Bid_NC,appRoles.Watch,appRoles.Watch_GD,appRoles.Developer]}><BiddingList/></RouteGuard>}/>
          <Route path="closeouts/closeoutlist" element={<RouteGuard roles={[appRoles.CloseOut,appRoles.Developer]}><CloseoutList/></RouteGuard>}/>
          <Route path="closeouts/report" element={<RouteGuard roles={[appRoles.Reports,appRoles.Developer]}><CloseoutsReport/></RouteGuard>}/>
          <Route path="closeouts/reportwithfilter" element={<RouteGuard roles={[appRoles.Reports,appRoles.Developer]}><CloseoutsReportWithFilter/></RouteGuard>}/>
          <Route path="closeouts/watchlist" element={<RouteGuard roles={[appRoles.CloseOut,appRoles.Developer]}><Watchlistcloseouts/></RouteGuard>}/>
     <Route path="auctionsreport" element={<RouteGuard roles={[appRoles.Reports,appRoles.Developer]}><AuctionsReport/></RouteGuard>}/>
     <Route path="sample" element={<RouteGuard roles={[appRoles.Sample,appRoles.Developer]}><Ssubmit/></RouteGuard>}/>
     <Route path="live/dynadot" element={<RouteGuard roles={[appRoles.Live_Bid_DD,appRoles.Live_Watch,appRoles.Developer]}><Live/></RouteGuard>}/>
     <Route path="live/dropcatch" element={<RouteGuard roles={[appRoles.Live_Bid_DC,appRoles.Live_Watch,appRoles.Developer]}><DCLive/></RouteGuard>}/>
<Route path="live/namecheap" element={<RouteGuard roles={[appRoles.Live_Bid_NC,appRoles.Live_Watch,appRoles.Developer]}><NamecheapLive/></RouteGuard>}/>
<Route path="live/godaddy" element={<RouteGuard roles={[appRoles.Live_Bid_GD,appRoles.Live_Watch,appRoles.Developer]}><GDLive/></RouteGuard>}/>
<Route path="live/namesilo" element={<RouteGuard roles={[appRoles.Live_Bid_DD,appRoles.Live_Watch,appRoles.Developer]}><NamesiloLive/></RouteGuard>}/>
<Route path="tools/est" element={<Bulkfest1/>}/>
<Route path="tools/stats" element={<BulkStats/>}/>

<Route path="watchlist" element={<RouteGuard roles={[appRoles.Watch,appRoles.Developer]}><WatchList/></RouteGuard>}/>
     <Route path="settings/preferences" element={<RouteGuard roles={[appRoles.Admin,appRoles.Developer]}><PreferencesNew/></RouteGuard>}/>
     <Route path="settings/apikeys" element={<RouteGuard roles={[appRoles.Admin,appRoles.Developer]}><Apikeys/></RouteGuard>}/>
     <Route path="settings/live" element={<RouteGuard roles={[appRoles.Admin,appRoles.Developer]}><LiveSettings/></RouteGuard>}/>
     <Route path="notifications" element={<RouteGuard roles={[appRoles.Reports,appRoles.Developer]}><Notifications/></RouteGuard>}/>
     <Route path="settings/algo" element={<RouteGuard roles={[appRoles.Admin,appRoles.Developer]}><AlgoSettings/></RouteGuard>}/>
     <Route path="sample" element={<RouteGuard roles={[appRoles.Admin,appRoles.Developer]}><SampleUI/></RouteGuard>}/>


     </Route>
    { //<Route path="/bulkfetch" exact element={<RouteGuard roles={[appRoles.Bid_GD]}><BulkFetch/></RouteGuard>}/>
     //<Route path="/proside" exact element={<RouteGuard roles={[appRoles.Bid_GD]}><Proside/></RouteGuard>}/>
  }

<Route path="/m" element={<Navigation />}>
          <Route index element={<Dashboard />} />
          <Route path="watchlistm" element={<RouteGuard roles={[appRoles.Watch,appRoles.Developer]}><WatchtlistM/></RouteGuard>} />
          <Route path="live/dynadot" element={<RouteGuard roles={[appRoles.Live_Bid_DD,appRoles.Live_Watch,appRoles.Developer]}><LiveM/></RouteGuard>} />
          <Route path="live/dropcatch" element={<RouteGuard roles={[appRoles.Live_Bid_DC,appRoles.Live_Watch,appRoles.Developer]}><DCLiveM/></RouteGuard>} />
          <Route path="live/namecheap" element={<RouteGuard roles={[appRoles.Live_Bid_NC,appRoles.Live_Watch,appRoles.Developer]}><NamecheapLiveM/></RouteGuard>} />
          <Route path="live/namesilo" element={<RouteGuard roles={[appRoles.Live_Bid_NS,appRoles.Live_Watch,appRoles.Developer]}><NamesiloLiveM/></RouteGuard>} />
          <Route path="live/GoDaddy" element={<RouteGuard roles={[appRoles.Live_Bid_GD,appRoles.Live_Watch,appRoles.Developer]}><GDLiveM/></RouteGuard>} />
          <Route path="bulkfetchm" element={<RouteGuard roles={[appRoles.Watch,appRoles.Developer]}><BulkFetchM /></RouteGuard>} />
          <Route path="liveplatforms" element={<Liveplatforms />} />
          <Route path="bulkfetchgdvm" element={<BulkFGDVM />} />
          <Route path="notificationsm" element={<RouteGuard roles={[appRoles.Reports,appRoles.Developer]}><NotificationsM/></RouteGuard>} />
          <Route path="reportsm" element={<RouteGuard roles={[appRoles.Reports,appRoles.Developer]}><ReportsM/></RouteGuard>} />
          {/* <Route path="bulkfe1" element={<Bulkfe1 />} /> */}
          <Route path="bidpage" element={<RouteGuard roles={[appRoles.Bid_GD,appRoles.Bid_DD,appRoles.Bid_DC,appRoles.Bid_NS,appRoles.Bid_NC,appRoles.Developer]}><BidPage/></RouteGuard>} />
          <Route path="buy" element={<Buy />} />
          <Route path="closeoutsm" element={<CloseoutsM />} />
          <Route path ="mypreferences" element ={<MyPreferences/>} />
          <Route path = "userprofile" element={<UserProfile/>} />
        </Route>
     </Routes>
     </>
      </Router>
    </div>
  );
}

export default App;
