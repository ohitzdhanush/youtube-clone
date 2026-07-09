import "./index.scss";
import {useEffect,useState} from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import {FaEdit,FaTrash,FaSearch,FaVideo} from "react-icons/fa";
import toast from "react-hot-toast";

const MyVideos=()=>{
const[videos,setVideos]=useState([]);
const[search,setSearch]=useState("");
const[editing,setEditing]=useState(null);
const[title,setTitle]=useState("");
const[description,setDescription]=useState("");

useEffect(()=>{
const saved=JSON.parse(localStorage.getItem("uploadedVideos"))||[];
setVideos(saved);
},[]);

const filteredVideos=videos.filter(video=>
video.title.toLowerCase().includes(search.toLowerCase())
);

const handleDelete=id=>{
const updated=videos.filter(video=>video.id!==id);
setVideos(updated);
localStorage.setItem("uploadedVideos",JSON.stringify(updated));
toast.success("Video Deleted");
};

const startEdit=video=>{
setEditing(video.id);
setTitle(video.title);
setDescription(video.description);
};

const saveEdit=id=>{
const updated=videos.map(video=>{
if(video.id!==id)return video;
return{
...video,
title,
description
};
});
setVideos(updated);
localStorage.setItem("uploadedVideos",JSON.stringify(updated));
setEditing(null);
toast.success("Video Updated");
};

return(
<>
<Navbar/>
<div className="myvideos-page">
<Sidebar/>
<div className="myvideos-content">
<div className="myvideos-header">
<h2>My Uploaded Videos</h2>
<div className="search-box-videos">
<FaSearch/>
<input
type="text"
placeholder="Search videos..."
value={search}
onChange={e=>setSearch(e.target.value)}
/>
</div>
</div>

{filteredVideos.length===0?(
<div className="empty-videos">
<FaVideo/>
<h3>No Uploaded Videos</h3>
<p>Upload your first video.</p>
</div>
):(
<div className="videos-grid">
{filteredVideos.map(video=>(
<div className="video-card" key={video.id}>
<img src={video.thumbnail} alt={video.title}/>
{editing===video.id?(
<>
<input
value={title}
onChange={e=>setTitle(e.target.value)}
/>
<textarea
value={description}
onChange={e=>setDescription(e.target.value)}
/>
<button className="save-btn" onClick={()=>saveEdit(video.id)}>Save</button>
</>
):(
<>
<h3>{video.title}</h3>
<p>{video.description}</p>
<span>{video.category}</span>
<div className="card-actions">
<button onClick={()=>startEdit(video)}>
<FaEdit/>
</button>
<button onClick={()=>handleDelete(video.id)}>
<FaTrash/>
</button>
</div>
</>
)}
</div>
))}
</div>
)}
</div>
</div>
</>
);
};

export default MyVideos;