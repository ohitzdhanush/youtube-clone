import "./index.scss";
import {useNavigate} from "react-router-dom";
import {MdDelete,MdDeleteSweep} from "react-icons/md";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import {useHistoryVideos} from "../../Context/history";
import formatViews from "../../Utils/formatViews";
import timeAgo from "../../Utils/timeAgo";

const History=()=>{

const navigate=useNavigate();

const{
history,
removeHistory,
clearHistory
}=useHistoryVideos();

return(
<>
<Navbar/>

<div className="history-page">

<Sidebar/>

<div className="history-content">

<div className="history-header">

<h2>History</h2>

{history.length>0&&(
<button
className="clear-btn"
onClick={clearHistory}
>
<MdDeleteSweep/>
Clear History
</button>
)}

</div>

{
history.length===0?

<div className="empty">
<h3>No History</h3>
<p>Watch videos to see them here.</p>
</div>

:

history.map(video=>(

<div
className="history-card"
key={video.id}
>

<img
src={video.snippet.thumbnails.medium.url}
alt={video.snippet.title}
onClick={()=>navigate(`/video/${video.id}`)}
/>

<div
className="info"
onClick={()=>navigate(`/video/${video.id}`)}
>

<h3>{video.snippet.title}</h3>

<p>{video.snippet.channelTitle}</p>

<span>
{formatViews(video.statistics.viewCount)} views • {timeAgo(video.snippet.publishedAt)}
</span>

</div>

<button
onClick={()=>removeHistory(video.id)}
>
<MdDelete/>
</button>

</div>

))

}

</div>

</div>

</>
);

};

export default History;