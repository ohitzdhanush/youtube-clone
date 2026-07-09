import {Routes,Route} from "react-router-dom";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import VideoDetails from "./Pages/VideoDetails";
import Channel from "./Pages/Channel";
import WatchLater from "./Pages/WatchLater";
import LikedVideos from "./Pages/LikedVideos";
import History from "./Pages/History";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";
import Playlist from "./Pages/Playlist";
import Notifications from "./Pages/Notifications";
import Profile from "./Pages/Profile";
import MyVideos from "./Pages/MyVideos";
const App=()=>{
return(
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/search/:query" element={<Search/>}/>
<Route path="/video/:id" element={<VideoDetails/>}/>
<Route path="/channel/:id" element={<Channel/>}/>
<Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
<Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/>
<Route path="/watch-later" element={<ProtectedRoute><WatchLater/></ProtectedRoute>}/>
<Route path="/liked-videos" element={<ProtectedRoute><LikedVideos/></ProtectedRoute>}/>
<Route path="/history" element={<ProtectedRoute><History/></ProtectedRoute>}/>
<Route path="/playlists" element={<ProtectedRoute><Playlist/></ProtectedRoute>}/>
<Route path="/notifications" element={<ProtectedRoute><Notifications/></ProtectedRoute>}/>
<Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
<Route path="/my-videos" element={<ProtectedRoute><MyVideos/></ProtectedRoute>}/>
</Routes>
);
};

export default App;
// import {Routes,Route} from "react-router-dom";
// import Home from "./Pages/Home";
// import Search from "./Pages/Search";
// import VideoDetails from "./Pages/VideoDetails";
// import Channel from "./Pages/Channel";
// import WatchLater from "./Pages/WatchLater";
// import LikedVideos from "./Pages/LikedVideos";
// import History from "./Pages/History";
// import Register from "./Pages/Register";
// import Login from "./Pages/Login";
// import ProtectedRoute from "./Components/ProtectedRoute";
// import PublicRoute from "./Components/PublicRoute";
// const App=()=>{
// return(
// <Routes>
// <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
// <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/>
// <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
// <Route path="/search/:query" element={<ProtectedRoute><Search/></ProtectedRoute>}/>
// <Route path="/video/:id" element={<ProtectedRoute><VideoDetails/></ProtectedRoute>}/>
// <Route path="/channel/:id" element={<ProtectedRoute><Channel/></ProtectedRoute>}/>
// <Route path="/watch-later" element={<ProtectedRoute><WatchLater/></ProtectedRoute>}/>
// <Route path="/liked-videos" element={<ProtectedRoute><LikedVideos/></ProtectedRoute>}/>
// <Route path="/history" element={<ProtectedRoute><History/></ProtectedRoute>}/>
// </Routes>
// );
// };

// export default App;
