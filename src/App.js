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
import Live from './Components/Live';

function App() {
  return (
    <div className="App">
      <Router>
     <>
    
     <Routes>
     <Route path="/" exact element={<SignInSide/>}/>
     <Route path="/login" exact element={<SignInSide/>}/>
     <Route path="/home1" exact element={<Home/>}/>
     <Route path="/home" element={<Home1/>}>
     <Route index element={<Mbid />} />
     <Route path="bulkbid" element={<Mbid />} />
          <Route path="bulkfetch" element={<Bulkf />} />
          <Route path="biddinglist" element={<BiddingList/>}/>
     <Route path="auctionsreport" element={<AuctionsReport/>}/>
     <Route path="sample" element={<Ssubmit/>}/>
     <Route path="live" element={<Live/>}/>

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
