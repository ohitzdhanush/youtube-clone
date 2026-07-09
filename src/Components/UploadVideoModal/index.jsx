import "./index.scss";
import {useState} from "react";
import {FaTimes,FaUpload,FaImage} from "react-icons/fa";
import toast from "react-hot-toast";

const UploadVideoModal=({open,onClose})=>{
const[title,setTitle]=useState("");
const[description,setDescription]=useState("");
const[category,setCategory]=useState("Entertainment");
const[thumbnail,setThumbnail]=useState("");
const[videoFile,setVideoFile]=useState("");
const[uploading,setUploading]=useState(false);
const[progress,setProgress]=useState(0);
const[success,setSuccess]=useState(false);

if(!open)return null;

const handleThumbnail=e=>{
const file=e.target.files[0];
if(!file)return;
setThumbnail(URL.createObjectURL(file));
};

const handleVideo=e=>{
const file=e.target.files[0];
if(!file)return;
setVideoFile(file.name);
};

const handleUpload=()=>{
if(!title||!description||!thumbnail||!videoFile){
toast.error("Please fill all fields");
return;
}
setUploading(true);
setProgress(0);
let value=0;
const timer=setInterval(()=>{
value+=10;
setProgress(value);
if(value>=100){
clearInterval(timer);
const uploadedVideo={
id:Date.now(),
title,
description,
category,
thumbnail,
videoName:videoFile,
uploadedAt:new Date().toLocaleString()
};
const saved=JSON.parse(localStorage.getItem("uploadedVideos"))||[];
localStorage.setItem("uploadedVideos",JSON.stringify([uploadedVideo,...saved]));
setUploading(false);
setSuccess(true);
toast.success("Video Uploaded Successfully");
setTimeout(()=>{
setSuccess(false);
setTitle("");
setDescription("");
setCategory("Entertainment");
setThumbnail("");
setVideoFile("");
onClose();
},1500);}},200);

};

return(
<div className="upload-overlay">
<div className="upload-modal">
<div className="upload-header">
<h2>Upload Video</h2>
<button onClick={onClose}>
<FaTimes/>
</button>
</div>
{uploading&&(
<div className="upload-progress">
<div className="progress-bar">
<div className="progress-fill" style={{width:`${progress}%`}}/>
</div>
<p>Uploading... {progress}%</p>
</div>
)}
{success&&(
<div className="upload-success">
<h2>🎉 Upload Completed</h2>
<p>Your video has been uploaded successfully.</p>
</div>
)}
<div className="upload-body">

<div className="upload-thumbnail">
{thumbnail?
<img src={thumbnail} alt="thumbnail"/>:
<label>
<FaImage/>
<span>Select Thumbnail</span>
<input type="file" accept="image/*" onChange={handleThumbnail}/>
</label>
}
</div>

<div className="upload-form">

<input
type="text"
placeholder="Video Title"
value={title}
onChange={e=>setTitle(e.target.value)}
/>

<textarea
placeholder="Description"
value={description}
onChange={e=>setDescription(e.target.value)}
/>

<select
value={category}
onChange={e=>setCategory(e.target.value)}
>
<option>Entertainment</option>
<option>Music</option>
<option>Gaming</option>
<option>Education</option>
<option>Technology</option>
<option>Sports</option>
</select>

<label className="video-file">
<FaUpload/>
<span>{videoFile||"Choose Video"}</span>
<input type="file" accept="video/*" onChange={handleVideo}/>
</label>

<button className="upload-btn" onClick={handleUpload}>
Upload Video
</button>

</div>

</div>

</div>
</div>
);
};

export default UploadVideoModal;