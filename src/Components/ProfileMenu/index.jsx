import "./index.scss";
import {useEffect,useRef} from "react";
import {useNavigate} from "react-router-dom";
import {FaMoon,FaSun,FaSignOutAlt,FaUserCircle} from "react-icons/fa";
import {signOut} from "firebase/auth";
import {auth} from "../../Services/firebase";
import {useTheme} from "../../Context/themecontext";
import {useAuth} from "../../Context/authcontext";

const ProfileMenu=({open,onClose})=>{

const menuRef=useRef(null);
const navigate=useNavigate();

const{theme,toggleTheme}=useTheme();
const{currentUser}=useAuth();

useEffect(()=>{

const handleClick=(e)=>{
if(menuRef.current&&!menuRef.current.contains(e.target)){
onClose();
}
};

document.addEventListener("mousedown",handleClick);

return()=>{
document.removeEventListener("mousedown",handleClick);
};

},[onClose]);

const handleLogout=async()=>{

await signOut(auth);

onClose();

navigate("/login");

};

if(!open)return null;

return(
<div className="profile-menu" ref={menuRef}>

<div className="profile-header">

{currentUser?.photoURL?(
<img
src={currentUser.photoURL}
alt={currentUser.displayName}
/>
):(
<FaUserCircle className="profile-avatar"/>
)}

<div>
<h4>{currentUser?.displayName||currentUser?.email?.split("@")[0]||"Guest User"}</h4>
<p>{currentUser?.email}</p>
</div>

</div>

<hr/>

<button onClick={toggleTheme}>

{theme==="dark"?<FaSun/>:<FaMoon/>}

<span>
{theme==="dark"?"Light Mode":"Dark Mode"}
</span>

</button>

<button onClick={handleLogout}>

<FaSignOutAlt/>

<span>Logout</span>

</button>

</div>
);

};

export default ProfileMenu;