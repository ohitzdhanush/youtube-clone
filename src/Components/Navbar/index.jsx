import "./dekstop.scss";
import "./mobile.scss";
import "./tab.scss";
import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {HiMenu} from "react-icons/hi";
import {FaYoutube,FaRegUserCircle,FaMoon,FaSun,FaBell,FaPlus} from "react-icons/fa";
import {IoSearch,IoMic} from "react-icons/io5";
import {useSidebar} from "../../Context/sidebarcontext";
import {useSearch} from "../../Context/search";
import {useTheme} from "../../Context/themecontext";
import {getSearchSuggestions} from "../../Services/youtube";
import useDebounce from "../../Hooks/useDebounce";
import SearchSuggestions from "../SearchSuggestions";
import ProfileMenu from "../ProfileMenu";
import VoiceSearch from "../VoiceSearch";
import {useNotification} from "../../Context/notificationcontext";
import UploadVideoModal from "../UploadVideoModal/index";


const Navbar=()=>{
const navigate=useNavigate();
const{toggleSidebar}=useSidebar();
const{theme,toggleTheme}=useTheme();
const{notifications}=useNotification();
const unreadCount=notifications.filter(item=>!item.read).length;
const{setSearchText,suggestions,setSuggestions}=useSearch();
const[input,setInput]=useState("");
const[showVoiceSearch,setShowVoiceSearch]=useState(false);
const[showProfile,setShowProfile]=useState(false);
const[showUpload,setShowUpload]=useState(false);
const debouncedValue=useDebounce(input);

useEffect(()=>{
loadSuggestions();
},[debouncedValue]);

const loadSuggestions=async()=>{
if(debouncedValue.trim().length<2){
setSuggestions([]);
return;
}
const data=await getSearchSuggestions(debouncedValue);
setSuggestions(data);
};

const handleSearch=(value=input)=>{
const query=value.trim();
if(query.length<2)return;
setSearchText(query);
setSuggestions([]);
navigate(`/search/${encodeURIComponent(query)}`);
};

const handleKeyDown=e=>{
if(e.key==="Enter")handleSearch();
};

return(
<header className="navbar">
<div className="navbar__left">
<HiMenu className="navbar__menu" onClick={toggleSidebar}/>
<div className="navbar__logo" onClick={()=>navigate("/")}>
<FaYoutube className="youtube-icon"/>
<span>YouTube</span>
</div>
</div>
<div className="navbar__center">
<div className="search-box">
<input
type="text"
placeholder="Search"
value={input}
onChange={e=>setInput(e.target.value)}
onKeyDown={handleKeyDown}
/>
<button type="button" onClick={()=>handleSearch()}>
<IoSearch/>
</button>
<button type="button" className="mic-btn" onClick={()=>setShowVoiceSearch(true)}>
<IoMic/>
</button>
<SearchSuggestions
suggestions={suggestions}
onSelect={item=>{
setInput(item);
handleSearch(item);
}}
/>
</div>
<VoiceSearch
open={showVoiceSearch}
onClose={()=>setShowVoiceSearch(false)}
onSearch={text=>{
setInput(text);
setSearchText(text);
setSuggestions([]);
navigate(`/search/${encodeURIComponent(text)}`);
}}
/>
</div>
<div className="navbar__right">
<button className="create-btn desktop-only" onClick={()=>setShowUpload(true)}>
<FaPlus/>
<span>Create</span>
</button>
<button className="theme-btn desktop-only" onClick={toggleTheme}>{theme==="dark"?<FaSun/>:<FaMoon/>}</button>
<div className="notification-btn desktop-only" onClick={()=>navigate("/notifications")}><FaBell/>{unreadCount>0&&<span className="notification-count">{unreadCount>99?"99+":unreadCount}</span>}</div>
<FaRegUserCircle className="profile-icon" onClick={()=>setShowProfile(prev=>!prev)}/>
<ProfileMenu open={showProfile} onClose={()=>setShowProfile(false)}/>
<UploadVideoModal open={showUpload} onClose={()=>setShowUpload(false)}/>
</div>
</header>
);
};

export default Navbar;