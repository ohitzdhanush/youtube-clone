import "./index.scss";
import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword,signInWithPopup} from "firebase/auth";
import {auth,googleProvider} from "../../Services/firebase";
import {useNotification} from "../../Context/notificationcontext";  

const Login=()=>{

const navigate=useNavigate();
const{addNotification}=useNotification();

const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
const[error,setError]=useState("");
const[loading,setLoading]=useState(false);

const handleLogin=async(e)=>{
e.preventDefault();
setError("");

if(!email||!password){
setError("Please fill all fields.");
return;
}

try{
setLoading(true);

await signInWithEmailAndPassword(auth,email,password);

addNotification(
"Welcome Back 👋",
auth.currentUser.email,
"login"
);

navigate("/");


}catch(err){
setError(err.message);
}

setLoading(false);
};

const handleGoogleLogin=async()=>{
try{
const result=await signInWithPopup(auth,googleProvider);
addNotification(
"Welcome Back 👋",
result.user.email,
"login"
);
navigate("/");
}catch(err){
setError(err.message);
}
};

return(
<div className="login">
<div className="login-card">

<h2>Welcome Back</h2>

<form onSubmit={handleLogin}>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

{error&&<p className="error">{error}</p>}

<button type="submit">
{loading?"Signing In...":"Login"}
</button>

</form>

<button
className="google-btn"
onClick={handleGoogleLogin}
>
Continue with Google
</button>

<p>
Don't have an account?
<Link to="/register"> Register</Link>
</p>

</div>
</div>
);

};

export default Login;