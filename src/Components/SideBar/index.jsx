import "./index.scss";
import {useNavigate,useLocation} from "react-router-dom";
import {MdHomeFilled,MdOutlineSubscriptions,MdOutlineWatchLater} from "react-icons/md";
import {SiYoutubeshorts} from "react-icons/si";
import {FaHistory} from "react-icons/fa";
import {BiLike} from "react-icons/bi";
import {useSidebar} from "../../Context/sidebarcontext";

const Sidebar=()=>{
const navigate=useNavigate();
const location=useLocation();
const{isOpen}=useSidebar();

return(
<aside className={`sidebar ${isOpen?"open":"close"}`}>
<ul>
<li className={location.pathname==="/"?"active":""} onClick={()=>navigate("/")}>
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
<li className={location.pathname==="/history"?"active":""} onClick={()=>navigate("/history")}>
<FaHistory/>
<span>History</span>
</li>
<li className={location.pathname==="/watch-later"?"active":""} onClick={()=>navigate("/watch-later")}>
<MdOutlineWatchLater/>
<span>Watch Later</span>
</li>
<li className={location.pathname==="/liked-videos"?"active":""} onClick={()=>navigate("/liked-videos")}>
<BiLike/>
<span>Liked Videos</span>
</li>
</ul>
</aside>
);
};

export default Sidebar;