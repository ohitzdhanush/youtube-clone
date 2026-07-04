import "./index.scss";
import {useState} from "react";
import {FaTimes} from "react-icons/fa";
import {usePlaylist} from "../../Context/playlistcontext";
import {useNotification} from "../../Context/notificationcontext";

const PlaylistModal=({open,onClose,video})=>{

const{playlists,createPlaylist,addVideoToPlaylist}=usePlaylist();
const{addNotification}=useNotification();
const[input,setInput]=useState("");

if(!open)return null;

const handleCreate=()=>{
if(!input.trim())return;
createPlaylist(input);
setInput("");
};

return(
<div className="playlist-overlay" onClick={onClose}>
<div className="playlist-modal" onClick={e=>e.stopPropagation()}>
<div className="playlist-header">
<h3>Save to Playlist</h3>
<button onClick={onClose}>
<FaTimes/>
</button>
</div>
<div className="playlist-list">
{playlists.length===0&&(
<p className="empty-playlist">
No playlists created.
</p>
)}
{playlists.map(item=>(
<label key={item.id} className="playlist-item">
<input
type="checkbox"
onChange={()=>{
addVideoToPlaylist(item.id,video);
addNotification(
"Added To Playlist",
video.snippet.title,
"playlist"
);
}}
/>
<span>{item.name}</span>
</label>
))}
</div>
<div className="playlist-create">
<input
type="text"
placeholder="New playlist"
value={input}
onChange={e=>setInput(e.target.value)}
onKeyDown={e=>{
if(e.key==="Enter"){
handleCreate();
}
}}
/>
<button onClick={handleCreate}>
Create
</button>
</div>
</div>
</div>
);

};

export default PlaylistModal;