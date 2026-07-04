import "./index.scss";
import {useEffect,useState,useRef} from "react";
import {useParams} from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import VideoCard from "../../Components/VideoCard";
import Skeleton from "../../Components/Skeleton";
import {getChannelDetails,getChannelVideos} from "../../Services/youtube";
import formatViews from "../../Utils/formatViews";

const Channel=()=>{

const{id}=useParams();

const[channel,setChannel]=useState(null);
const[videos,setVideos]=useState([]);
const[loading,setLoading]=useState(true);
const[error,setError]=useState(false);
const[loadingMore,setLoadingMore]=useState(false);
const[nextPageToken,setNextPageToken]=useState("");
const[hasMore,setHasMore]=useState(true);
const[subscribed,setSubscribed]=useState(false);

const observer=useRef(null);
const fetching=useRef(false);

useEffect(()=>{
loadChannel();
window.scrollTo(0,0);
},[id]);

useEffect(()=>{
const saved=JSON.parse(localStorage.getItem("subscriptions"))||[];
setSubscribed(saved.includes(id));
loadChannel();
window.scrollTo(0,0);
},[id]);

const loadChannel=async(token="")=>{
if(fetching.current)return;
fetching.current=true;
token?setLoadingMore(true):setLoading(true);
try{
if(!channel){
  if(error){
return(
<>
<Navbar/>
<div className="channel-loading">
<div className="channel-error">
<h2>Something went wrong.</h2>
<p>Unable to load channel.</p>
<button onClick={()=>loadChannel()}>
Retry
</button>
</div>
</div>
</>
);
}
const details=await getChannelDetails(id);
setChannel(details);
}
const data=await getChannelVideos(id,token);
if(token){

setVideos(prev=>{
const ids=new Set(prev.map(item=>item.id.videoId));
const latest=data.videos.filter(item=>!ids.has(item.id.videoId));
return[...prev,...latest];
});
}else{
setVideos(data.videos);
}
setNextPageToken(data.nextPageToken||"");
setHasMore(!!data.nextPageToken);
setError(false);
}catch(error){
console.log(error);
setError(true);
}finally{
setLoading(false);
setLoadingMore(false);
fetching.current=false;
}
};
const lastVideoRef=node=>{
if(loadingMore||!hasMore)return;
if(observer.current){
observer.current.disconnect();
}
observer.current=new IntersectionObserver(entries=>{
if(entries[0].isIntersecting&&nextPageToken&&!fetching.current){
loadChannel(nextPageToken);
}
},{
root:null,
rootMargin:"300px",
threshold:0
});
if(node){
observer.current.observe(node);
}
};
if(loading){
return(
<>
<Navbar/>
<div className="channel-loading">
<Skeleton count={8}/>
</div>
</>
);
}

if(!channel){
return(
<>
<Navbar/>
<div className="channel-loading">
Channel Not Found
</div>
</>
);
}
const handleSubscribe=()=>{
const saved=JSON.parse(localStorage.getItem("subscriptions"))||[];
if(subscribed){
const updated=saved.filter(item=>item!==id);
localStorage.setItem("subscriptions",JSON.stringify(updated));
setSubscribed(false);
}else{
saved.push(id);
localStorage.setItem("subscriptions",JSON.stringify(saved));
setSubscribed(true);
}

};

const{snippet,statistics,brandingSettings}=channel;

return(
<>
<Navbar/>
<div className="channel-page">
<Sidebar/>
<div className="channel-content">
<div className="channel-banner">
<img
src={brandingSettings?.image?.bannerExternalUrl||"https://via.placeholder.com/1200x250?text=YouTube+Channel"}
alt={snippet.title}
/>
</div>
<div className="channel-header">
<img
className="channel-avatar"
src={snippet.thumbnails.high.url}
alt={snippet.title}
/>
<div className="channel-info">
<h2>{snippet.title}</h2>
<p>{formatViews(statistics.subscriberCount)} subscribers • {formatViews(statistics.videoCount)} videos</p>
<p>{formatViews(statistics.viewCount)} total views</p>
<p>Joined {new Date(snippet.publishedAt).toLocaleDateString()}</p>
<p className="channel-description">{snippet.description||"No description available."}</p>
</div>
<button className={`subscribe-btn ${subscribed?"subscribed":""}`}onClick={handleSubscribe}>
{subscribed?"Subscribed":"Subscribe"}
</button>
</div>
<h3 className="video-title">Latest Videos</h3>
{videos.length===0?(
<div className="empty-channel">
<h2>No Videos Found</h2>
<p>This channel hasn't uploaded any videos yet.</p>
</div>
):(
<div className="channel-grid">

{videos.map((video,index)=>{

if(index===videos.length-1){
return(
<div
key={video.id.videoId}
ref={lastVideoRef}
>
<VideoCard video={video}/>
</div>
);
}

return(
<VideoCard
key={video.id.videoId}
video={video}
/>
);

})}

</div>
)}
{loadingMore&&<Skeleton count={4}/>}
{!hasMore&&videos.length>0&&(
<div className="end-message">
🎉 No more videos to load.
</div>
)}
</div>
</div>
</>
);
}

export default Channel;