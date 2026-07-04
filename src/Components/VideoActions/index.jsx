import "./index.scss";
import {useState} from "react";
import {FaThumbsUp,FaThumbsDown,FaShare,FaBookmark} from "react-icons/fa";
import {useVideoActions} from "../../Context/videoactions";
import PlaylistModal from "../PlaylistModal";
import {useNotification} from "../../Context/notificationcontext";
import toast from "react-hot-toast";

const VideoActions=({video})=>{
const{likedVideos,dislikedVideos,toggleLike,toggleDislike}=useVideoActions();
const{addNotification}=useNotification();
const liked=likedVideos.includes(video.id);
const disliked=dislikedVideos.includes(video.id);
const[showPlaylist,setShowPlaylist]=useState(false);
const handleShare=async()=>{
const url=window.location.href;
if(navigator.share){
try{
await navigator.share({
title:video.snippet.title,
url
});
}catch{}
}else{
await navigator.clipboard.writeText(url);
toast.success("Link copied to clipboard");
addNotification(
"Video Shared",
video.snippet.title,
"share"
);
}

};

return(
<div className="video-actions">
<button
className={`like-btn ${liked?"active pulse":""}`}
onClick={()=>{
toggleLike(video.id);

if(!liked){
toast.success("Liked 👍");
addNotification(
"Video Liked",
video.snippet.title,
"like"
);
}else{
toast("Like removed");
}
}}
>
<FaThumbsUp/>
<span>Like</span>
</button>
<button
className={`dislike-btn ${disliked?"active":""}`}
onClick={()=>{
toggleDislike(video.id);
if(!disliked){
toast("Disliked");
}
}}
>
<FaThumbsDown/>
<span>Dislike</span>
</button>
<button onClick={handleShare}>
<FaShare/>
<span>Share</span>
</button>
<button
onClick={()=>setShowPlaylist(true)}
>
<FaBookmark/>
<span>Save</span>
</button>
<PlaylistModal
open={showPlaylist}
onClose={()=>setShowPlaylist(false)}
video={video}
/>
</div>
);

};

export default VideoActions;