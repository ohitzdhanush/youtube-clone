import "./index.scss";
import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import VideoCard from "../../Components/VideoCard";
import Skeleton from "../../Components/Skeleton";
import {searchVideos} from "../../Services/youtube";

const Search=()=>{

const{query}=useParams();
const[videos,setVideos]=useState([]);
const[loading,setLoading]=useState(true);

useEffect(()=>{
loadVideos();
window.scrollTo(0,0);
},[query]);

const loadVideos=async()=>{
setLoading(true); 
try{
const data=await searchVideos(query);
setVideos(data.videos);
}catch(error){
console.log(error);
setVideos([]);
}
setLoading(false);
};

return(
<>
<Navbar/>
<div className="search-page">
<Sidebar/>
<main className="search-content">
<h2 className="search-title">
Search Results for <span>"{decodeURIComponent(query)}"</span>
</h2>

{loading?(
<Skeleton count={12}/>
):videos.length===0?(
<div className="search-empty">
<h3>No videos found</h3>
<p>Try searching with another keyword.</p>
</div>
):(
<div className="search-grid">
{videos.map(video=>(
<VideoCard
key={video.id}
video={video}
/>
))}
</div>
)}
</main>
</div>
</>
);

};

export default Search;