import "./index.scss";
import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../Services/firebase";
import {useNotification} from "../../Context/notificationcontext";

const Register=()=>{
const navigate=useNavigate();
const{addNotification}=useNotification();
const[name,setName]=useState("");
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
const[error,setError]=useState("");
const[loading,setLoading]=useState(false);

const handleRegister=async(e)=>{
e.preventDefault();
setError("");

if(!name||!email||!password){
setError("Please fill all fields.");
return;
}

if(password.length<6){
setError("Password must be at least 6 characters.");
return;
}

try{
setLoading(true);

const userCredential=await createUserWithEmailAndPassword(
auth,
email,
password
);

addNotification(
"Account Created 🎉",
userCredential.user.email,
"register"
);

navigate("/login");

}catch(err){
setError(err.message);
}

setLoading(false);
};

return(
<div className="register">
<div className="register-card">
<h2>Create Account</h2>
<form onSubmit={handleRegister}>
<input
type="text"
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>
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
{loading?"Creating...":"Register"}
</button>
</form>
<p>
Already have an account?
<Link to="/login"> Login</Link>
</p>
</div>
</div>
);
};

export default Register;