import logo from './logo.svg';
import './App.css';
import Ssubmit from './Components/submit';
import SignInSide from './Components/SignIn';
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
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

function App() {
  return (
    <div className="App">
      <Router>
     <>
    
     <Routes>
     <Route path="/" exact element={<SignInSide/>}/>
     <Route path="/login" exact element={<SignInSide/>}/>
     <Route path="/home1" exact element={<Home/>}/>
     <Route path="/home" element={<AuthenticatedRoute><Home1/></AuthenticatedRoute>}>
     <Route index element={<Mbid />} />
     <Route path="bulkbid" element={<Mbid />} />
          <Route path="bulkfetch" element={<Bulkf />} />
          <Route path="bulkfetchgdv" element={<Bulkfgdv />} />

          <Route path="closeouts/bulkfetch" element={<Bulkfetchcloseout />} />
          <Route path="closeouts/bulkbuy" element={<Mcloseouts />} />
          <Route path="biddinglist" element={<BiddingList/>}/>
          <Route path="closeouts/closeoutlist" element={<CloseoutList/>}/>
          <Route path="closeouts/report" element={<CloseoutsReport/>}/>
          <Route path="closeouts/watchlist" element={<Watchlistcloseouts/>}/>
     <Route path="auctionsreport" element={<AuctionsReport/>}/>
     <Route path="sample" element={<Ssubmit/>}/>
     <Route path="live/dynadot" element={<Live/>}/>
     <Route path="live/namecheap" element={<NamecheapLive/>}/>

     <Route path="watchlist" element={<WatchList/>}/>
     <Route path="settings/preferences" element={<Preferences/>}/>
     <Route path="notifications" element={<Notifications/>}/>
     </Route>
     <Route path="/bulkfetch" exact element={<BulkFetch/>}/>
     
     <Route path="/proside" exact element={<Proside/>}/>
     </Routes>
     </>
      </Router>
    </div>
  );
}

export default App;
