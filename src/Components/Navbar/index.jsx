import "./index.scss";
import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {HiMenu} from "react-icons/hi";
import {FaYoutube,FaRegUserCircle,FaMoon,FaSun} from "react-icons/fa";
import {IoSearch} from "react-icons/io5";
import {useSidebar} from "../../Context/sidebarcontext";
import {useSearch} from "../../Context/search";
import {useTheme} from "../../Context/themecontext";
import {getSearchSuggestions} from "../../Services/youtube";
import useDebounce from "../../Hooks/useDebounce";
import SearchSuggestions from "../SearchSuggestions";
import ProfileMenu from "../ProfileMenu/index";

const Navbar=()=>{

const navigate=useNavigate();
const{toggleSidebar}=useSidebar();
const{theme,toggleTheme}=useTheme();
const{setSearchText,suggestions,setSuggestions}=useSearch();
const[input,setInput]=useState("");
const[showProfile,setShowProfile]=useState(false);
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

const handleKeyDown=(e)=>{
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
onChange={(e)=>setInput(e.target.value)}
onKeyDown={handleKeyDown}
/>
<button onClick={()=>handleSearch()}>
<IoSearch/>
</button>
<SearchSuggestions
suggestions={suggestions}
onSelect={(item)=>{
setInput(item);
handleSearch(item);
}}
/>
</div>
</div>
<div className="navbar__right">
<button
className="theme-btn"
onClick={toggleTheme}>
{theme==="dark"?<FaSun/>:<FaMoon/>}
</button>
<FaRegUserCircle
className="profile-icon"
onClick={()=>setShowProfile(prev=>!prev)}/>
<ProfileMenu
open={showProfile}
onClose={()=>setShowProfile(false)}/>
</div>
</header>
);

};

export default Navbar;