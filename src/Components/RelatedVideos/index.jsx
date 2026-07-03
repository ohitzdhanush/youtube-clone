import "./index.scss";
import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import {getRelatedVideos} from "../../Services/youtube";
import timeAgo from "../../Utils/timeAgo";

const RelatedVideos=({videoId})=>{

const navigate=useNavigate();
const[videos,setVideos]=useState([]);
const[loading,setLoading]=useState(true);

useEffect(()=>{
loadVideos();
},[videoId]);

const loadVideos=async()=>{
setLoading(true);
try{
const data=await getRelatedVideos(videoId);
setVideos(data);
}catch(error){
console.log(error);
setVideos([]);
}
setLoading(false);
};

if(loading){
return(
<div className="related-videos">
<h3>Related Videos</h3>
<div className="related-loading">Loading...</div>
</div>
);
}

return(
<div className="related-videos">

<h3>Related Videos</h3>

{videos.length===0?(
<div className="related-loading">
No Related Videos
</div>
):(

videos.map(video=>(

<div
key={video.id.videoId}
className="related-video"
onClick={()=>{
window.scrollTo({top:0,behavior:"smooth"});
navigate(`/video/${video.id.videoId}`);
}}
>

<img
src={video.snippet.thumbnails.medium.url}
alt={video.snippet.title}
/>

<div className="related-video__info">

<h4>{video.snippet.title}</h4>

<p>{video.snippet.channelTitle}</p>

<span>{timeAgo(video.snippet.publishedAt)}</span>

</div>

</div>

))

)}

</div>
);

};

export default RelatedVideos;