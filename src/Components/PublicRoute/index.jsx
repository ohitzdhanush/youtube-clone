import {Navigate} from "react-router-dom";
import {useAuth} from "../../Context/authcontext";

const PublicRoute=({children})=>{

const{currentUser,loading}=useAuth();

if(loading){
return<div>Loading...</div>;
}

if(currentUser){
return<Navigate to="/" replace/>;
}

return children;

};

export default PublicRoute;