import "./index.scss";
import {useState} from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import {FaUserCircle,FaHeart,FaClock,FaHistory,FaList,FaCamera,FaEdit} from "react-icons/fa";
import {updateProfile} from "firebase/auth";
import {useAuth} from "../../Context/authcontext";
import {useLikedVideos} from "../../Context/likedvideos";
import {useWatchLater} from "../../Context/watchlater";
import {useHistoryVideos} from "../../Context/history";
import {usePlaylist} from "../../Context/playlistcontext";
import toast from "react-hot-toast";

const Profile=()=>{
const{currentUser,logout}=useAuth();
const{likedVideos}=useLikedVideos();
const{watchLater}=useWatchLater();
const{history}=useHistoryVideos();
const{playlists}=usePlaylist();
const[name,setName]=useState(currentUser?.displayName||"");
const[photo,setPhoto]=useState(currentUser?.photoURL||"");
const[preview,setPreview]=useState(currentUser?.photoURL||"");
const handleImage=e=>{
const file=e.target.files[0];
if(!file)return;
const url=URL.createObjectURL(file);
setPreview(url);
setPhoto(url);
};
const handleSave=async()=>{
try{
await updateProfile(currentUser,{
displayName:name,
photoURL:photo
});
toast.success("Profile Updated");
}catch{
toast.error("Unable to update profile");
}
};
return(
<>
<Navbar/>
<div className="profile-page">
<Sidebar/>
<div className="profile-content">
<div className="profile-card">
<div className="profile-avatar">
{preview?<img src={preview} alt="profile"/>:<FaUserCircle/>}
<label className="camera-btn">
<FaCamera/>
<input type="file" accept="image/*" onChange={handleImage}/>
</label>
</div>
<div className="edit-name">
<FaEdit/>
<input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name"/>
</div>
<p>{currentUser?.email}</p>
<div className="profile-buttons">
<button className="save-btn" onClick={handleSave}>Save Profile</button>
<button className="logout-btn" onClick={logout}>Logout</button>
</div>
</div>
<div className="stats-grid">
<div className="stat-card">
<FaHeart/>
<h3>{likedVideos.length}</h3>
<p>Liked Videos</p>
</div>
<div className="stat-card">
<FaClock/>
<h3>{watchLater.length}</h3>
<p>Watch Later</p>
</div>
<div className="stat-card">
<FaHistory/>
<h3>{history.length}</h3>
<p>History</p>
</div>
<div className="stat-card">
<FaList/>
<h3>{playlists.length}</h3>
<p>Playlists</p>
</div>
</div>
</div>
</div>
</>
);
};

export default Profile;