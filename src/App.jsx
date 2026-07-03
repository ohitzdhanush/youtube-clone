import {Routes,Route} from "react-router-dom";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import VideoDetails from "./Pages/VideoDetails";
import Channel from "./Pages/Channel";
import WatchLater from "./Pages/WatchLater";
import LikedVideos from "./Pages/LikedVideos";
import History from "./Pages/History";

const App=()=>{
return(
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/search/:query" element={<Search/>}/>
<Route path="/video/:id" element={<VideoDetails/>}/>
<Route path="/channel/:id" element={<Channel/>}/>
<Route path="/watch-later" element={<WatchLater/>}/>
<Route path="/liked-videos" element={<LikedVideos/>}/>
<Route path="/history" element={<History/>}/>
</Routes>
);
};

export default App;