import "./index.scss";
import {useNavigate} from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import {usePlaylist} from "../../Context/playlistcontext";
import {FaTrash} from "react-icons/fa";

const Playlist=()=>{
const navigate=useNavigate();
const{playlists,deletePlaylist,removeVideo}=usePlaylist();

return(
<>
<Navbar/>
<div className="playlist-page">
<Sidebar/>
<div className="playlist-content">
<h2>Playlists</h2>
{playlists.length===0&&(
<div className="empty-playlists">
<h3>No Playlists Yet</h3>
<p>Create a playlist from any video.</p>
</div>
)}
{playlists.map(playlist=>(
<div className="playlist-card" key={playlist.id}>
<div className="playlist-header">
<div>
<h3>{playlist.name}</h3>
<p>{playlist.videos.length} Videos</p>
</div>
<button onClick={()=>deletePlaylist(playlist.id)}>
<FaTrash/>
</button>
</div>
{playlist.videos.length===0?(
<div className="playlist-empty">
No videos in this playlist.
</div>
):(
<div className="playlist-videos">
{playlist.videos.map(video=>(
<div className="playlist-video" key={video.id}>
<img
src={video.snippet.thumbnails.high.url}
alt={video.snippet.title}
onClick={()=>navigate(`/video/${video.id}`)}
/>
<div className="playlist-info">
<h4>{video.snippet.title}</h4>
<p>{video.snippet.channelTitle}</p>
</div>
<button
className="remove-btn"
onClick={()=>removeVideo(playlist.id,video.id)}
>
Remove
</button>
</div>
))}
</div>
)}
</div>
))}
</div>
</div>
</>
);
};

export default Playlist;