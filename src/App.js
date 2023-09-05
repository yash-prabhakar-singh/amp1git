import logo from "./logo.svg";
import "./App.css";
import Ssubmit from "./Components/submit";
import SignInSide from "./Components/SignIn";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Components/Home";
import SingleBid from "./Components/BulkFetch";
import CurrentBids from "./Components/BiddingList";
import HistoryBids from "./Components/AuctionsReport";
import Preferences from "./Components/Preferences";
import Notifications from "./Components/Notifications";
// import BulkFetch from './Components/BulkFetch';
import BiddingList from "./Components/BiddingList";
import WatchList from "./Components/Watchlist";
import AuctionsReport from "./Components/AuctionsReport";
import ProSidebar from "./Components/ProSidebar";
import Proside from "./Components/ProSidebar";
import Home1 from "./Components/Home copy";
import Mbid from "./Components/MultipleBid";
import Bulkf from "./Components/BulkFetch copy";
import Live from "./Components/DynadotLive";
import Bulkfetchcloseout from "./Components/BulkFetchCloseouts";
import Mcloseouts from "./Components/Multiplecloseoutsbuy";
import NamecheapLive from "./Components/NamecheapLive";
import CloseoutList from "./Components/CloseoutList";
import CloseoutsReport from "./Components/CloseoutsReport";
import Bulkfgdv from "./Components/BulkFetchGDV";
import AuthenticatedRoute from "./Components/AuthenticatedRoute";
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




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<SignInSide />} />
        <Route path="/login" exact element={<SignInSide />} />
        <Route
          path="/home"
          element={
            <AuthenticatedRoute>
              <Home1 />
            </AuthenticatedRoute>
          }
        >
          <Route index element={<Mbid />} />
          <Route path="bulkbid" element={<Mbid />} />
          <Route path="bulkfetch" element={<Bulkf />} />
          <Route path="bulkfetchgdv" element={<Bulkfgdv />} />

          <Route path="closeouts/bulkfetch" element={<Bulkfetchcloseout />} />
          <Route path="closeouts/bulkbuy" element={<Mcloseouts />} />
          <Route path="biddinglist" element={<BiddingList />} />
          <Route path="closeouts/closeoutlist" element={<CloseoutList />} />
          <Route path="closeouts/report" element={<CloseoutsReport />} />

          <Route path="auctionsreport" element={<AuctionsReport />} />
          <Route path="sample" element={<Ssubmit />} />
          <Route path="live/dynadot" element={<Live />} />
          <Route path="live/namecheap" element={<NamecheapLive />} />

          <Route path="watchlist" element={<WatchList />} />
          <Route path="settings/preferences" element={<Preferences />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
        <Route path="/proside" exact element={<Proside />} />

        

        <Route path="/dashboard/" element={<Navigation />}>
          <Route index element={<Dashboard />} />
          <Route path="watchlistm" element={<WatchtlistM />} />

          <Route path="bulkfetchm" element={<BulkFetchM />} />
          <Route path="liveplatforms" element={<Liveplatforms />} />
          <Route path="bulkfetchgdvm" element={<BulkFGDVM />} />
          <Route path="notificationsm" element={<NotificationsM />} />
          <Route path="reportsm" element={<ReportsM />} />
          

          {/* <Route path="bulkfe1" element={<Bulkfe1 />} /> */}
          <Route path="bidpage" element={<BidPage />} />
          <Route path="buy" element={<Buy />} />
          <Route path="closeoutsm" element={<CloseoutsM />} />
          <Route path ="mypreferences" element ={<MyPreferences/>} />
          <Route path = "userprofile" element={<UserProfile/>} />





          

        








    

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
