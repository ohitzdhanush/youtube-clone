import "./index.scss";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import { useLikedVideos } from "../../Context/likedvideos";
import formatViews from "../../Utils/formatViews";
import timeAgo from "../../Utils/timeAgo";

const LikedVideos=()=>{

const navigate=useNavigate();

const{
likedVideos,
removeLikedVideo
}=useLikedVideos();

return(
<>
<Navbar/>

<div className="liked-page">

<Sidebar/>

<div className="liked-content">

<h2>Liked Videos</h2>

{
likedVideos.length===0?

<div className="empty">
<h3>No Liked Videos</h3>
<p>Like videos to see them here.</p>
</div>

:

likedVideos.map(video=>(

<div
className="liked-card"
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
onClick={()=>removeLikedVideo(video.id)}
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

export default LikedVideos;