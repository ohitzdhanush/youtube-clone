import "./index.scss";
import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import {FaThumbsUp,FaThumbsDown,FaShare} from "react-icons/fa";
import {MdDownload} from "react-icons/md";
import {BsBookmarkPlus,BsBookmarkCheckFill} from "react-icons/bs";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import RelatedVideos from "../../Components/RelatedVideos";
import {getVideoDetails} from "../../Services/youtube";
import {useWatchLater} from "../../Context/watchlater";
import {useLikedVideos} from "../../Context/likedvideos";
import {useHistoryVideos} from "../../Context/history";
import formatViews from "../../Utils/formatViews";
import timeAgo from "../../Utils/timeAgo";

const VideoDetails=()=>{

const{id}=useParams();
const[video,setVideo]=useState(null);
const[loading,setLoading]=useState(true);

const{addToWatchLater,removeFromWatchLater,isSaved}=useWatchLater();
const{addLikedVideo,removeLikedVideo,isLiked}=useLikedVideos();
const{addHistory}=useHistoryVideos();

useEffect(()=>{
loadVideo();
window.scrollTo({top:0,behavior:"smooth"});
},[id]);

const loadVideo=async()=>{
setLoading(true);
try{
const data=await getVideoDetails(id);
if(data){
setVideo(data);
addHistory(data);
}
}catch(error){
console.log(error);
}
setLoading(false);
};

const handleLike=()=>{
if(!video)return;
isLiked(video.id)?removeLikedVideo(video.id):addLikedVideo(video);
};

const handleWatchLater=()=>{
if(!video)return;
isSaved(video.id)?removeFromWatchLater(video.id):addToWatchLater(video);
};

if(loading){
return(
<>
<Navbar/>
<div className="loading-video">Loading...</div>
</>
);
}

if(!video){
return(
<>
<Navbar/>
<div className="loading-video">Video Not Found</div>
</>
);
}

const{snippet,statistics}=video;

return(
<>
<Navbar/>
<div className="watch-page">
<Sidebar/>
<div className="watch-container">
<div className="video-section">

<div className="video-player">
<iframe
src={`https://www.youtube.com/embed/${id}`}
title={snippet.title}
allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
allowFullScreen
/>
</div>

<h2>{snippet.title}</h2>

<div className="video-info">

<div className="channel">
<img src={snippet.thumbnails.default.url} alt={snippet.channelTitle}/>
<div className="channel-details">
<h4>{snippet.channelTitle}</h4>
<span>1.2M Subscribers</span>
</div>
<button className="subscribe-btn">Subscribe</button>
</div>

<div className="actions">

<button className={isLiked(video.id)?"liked":""} onClick={handleLike}>
<FaThumbsUp/>
<span>{isLiked(video.id)?"Liked":formatViews(statistics.likeCount)}</span>
</button>

<button>
<FaThumbsDown/>
</button>

<button>
<FaShare/>
<span>Share</span>
</button>

<button>
<MdDownload/>
<span>Download</span>
</button>

<button onClick={handleWatchLater}>
{isSaved(video.id)?
<>
<BsBookmarkCheckFill/>
<span>Saved</span>
</>
:
<>
<BsBookmarkPlus/>
<span>Save</span>
</>}
</button>

</div>

</div>

<div className="description">
<p>{formatViews(statistics.viewCount)} views • {timeAgo(snippet.publishedAt)}</p>
<p>{snippet.description}</p>
</div>

</div>

<RelatedVideos videoId={id}/>

</div>
</div>
</>
);

};

export default VideoDetails;