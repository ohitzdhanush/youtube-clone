import "./index.scss";
import {useEffect,useState,useRef} from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import CategoryBar from "../../Components/CategoryBar";
import VideoCard from "../../Components/VideoCard";
import Skeleton from "../../Components/Skeleton";
import {getTrendingVideos} from "../../Services/youtube";

const Home=()=>{

const[videos,setVideos]=useState([]);
const[nextPageToken,setNextPageToken]=useState("");
const[loading,setLoading]=useState(true);
const[loadingMore,setLoadingMore]=useState(false);
const[hasMore,setHasMore]=useState(true);

const observer=useRef(null);
const fetching=useRef(false);

useEffect(()=>{
loadVideos();
},[]);
useEffect(()=>{
return()=>{
if(observer.current){
observer.current.disconnect();
}
};
},[]);

const loadVideos=async(token="")=>{

if(fetching.current)return;

fetching.current=true;

token?setLoadingMore(true):setLoading(true);

try{

const data=await getTrendingVideos(token);

if(token){
setVideos(prev=>{

const ids=new Set(prev.map(item=>item.id));

const newVideos=data.videos.filter(
item=>!ids.has(item.id)
);

return[...prev,...newVideos];

});
}else{
setVideos(data.videos);
}

if(data.nextPageToken){
setNextPageToken(data.nextPageToken);
setHasMore(true);
}else{
setNextPageToken("");
setHasMore(false);
}

}catch(error){
console.log(error);
}
finally{
setLoading(false);
setLoadingMore(false);
fetching.current=false;
}

};

const lastVideoRef=node=>{

if(loadingMore)return;
if(!hasMore)return;

if(observer.current){
observer.current.disconnect();
}

observer.current=new IntersectionObserver(
entries=>{

if(
entries[0].isIntersecting&&
hasMore&&
nextPageToken&&
!fetching.current
){
loadVideos(nextPageToken);
}

},
{
root:null,
rootMargin:"400px",
threshold:0
}
);

if(node){
observer.current.observe(node);
}

};
return(
<>
<Navbar/>

<div className="home">

<Sidebar/>

<main className="home-content">

<CategoryBar/>

{loading?(
<Skeleton count={120}/>
):(
<>
<div className="video-grid">

{videos.map((video,index)=>{

if(index===videos.length-1){
return(
<div
ref={lastVideoRef}
key={video.id}
>
<VideoCard video={video}/>
</div>
);
}

return(
<VideoCard
key={video.id}
video={video}
/>
);

})}

</div>

{loadingMore&&(
<Skeleton count={120}/>
)}

{!hasMore&&videos.length>0&&(
<div className="end-message">
🎉 You've reached the end.
</div>
)}
</>
)}

</main>

</div>

</>
);

};

export default Home;