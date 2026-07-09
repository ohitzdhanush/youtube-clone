import "./index.scss";
import {useNavigate,useLocation} from "react-router-dom";
import {MdHomeFilled,MdOutlineSubscriptions,MdOutlineWatchLater,MdPlaylistPlay} from "react-icons/md";
import {SiYoutubeshorts} from "react-icons/si";
import {FaHistory,FaVideo} from "react-icons/fa";
import {BiLike} from "react-icons/bi";
import {useSidebar} from "../../Context/sidebarcontext";

const Sidebar=()=>{
const navigate=useNavigate();
const location=useLocation();
const{isOpen,closeSidebar}=useSidebar();

return(
<aside className={`sidebar ${isOpen?"open":"close"}`}>
<ul>
<li className={location.pathname==="/"?"active":""} onClick={()=>{
    navigate("/");
    closeSidebar();}}>
<MdHomeFilled/>
<span>Home</span>
</li>
<li>
<SiYoutubeshorts/>
<span>Shorts</span>
</li>
<li>
<MdOutlineSubscriptions/>
<span>Subscriptions</span>
</li>
<hr/>
<li className={location.pathname==="/history"?"active":""} onClick={()=>{
    navigate("/history");
    closeSidebar();}}>
<FaHistory/>
<span>History</span>
</li>
<li className={location.pathname==="/watch-later"?"active":""} onClick={()=>{
    navigate("/watch-later");
    closeSidebar();}}>
<MdOutlineWatchLater/>
<span>Watch Later</span>
</li>
<li className={location.pathname==="/playlists"?"active":""} onClick={()=>{
    navigate("/playlists");
    closeSidebar();}}>
<MdPlaylistPlay/>
<span>Playlists</span>
</li>
<li className={location.pathname==="/my-videos"?"active":""} onClick={()=>{
    navigate("/my-videos");
    closeSidebar();}}>
<FaVideo/>
<span>My Videos</span>
</li>
<li className={location.pathname==="/liked-videos"?"active":""} onClick={()=>{
    navigate("/liked-videos");
    closeSidebar();}}>
<BiLike/>
<span>Liked Videos</span>
</li>
</ul>
</aside>
);
};

export default Sidebar;