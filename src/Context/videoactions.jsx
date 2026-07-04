import {createContext,useContext,useEffect,useState} from "react";

const VideoActionsContext=createContext();

export const VideoActionsProvider=({children})=>{

const[likedVideos,setLikedVideos]=useState(()=>{
return JSON.parse(localStorage.getItem("likedVideosAction"))||[];
});

const[dislikedVideos,setDislikedVideos]=useState(()=>{
return JSON.parse(localStorage.getItem("dislikedVideosAction"))||[];
});

useEffect(()=>{
localStorage.setItem("likedVideosAction",JSON.stringify(likedVideos));
},[likedVideos]);

useEffect(()=>{
localStorage.setItem("dislikedVideosAction",JSON.stringify(dislikedVideos));
},[dislikedVideos]);

const toggleLike=id=>{

if(likedVideos.includes(id)){
setLikedVideos(prev=>prev.filter(item=>item!==id));
return;
}

setLikedVideos(prev=>[...prev,id]);
setDislikedVideos(prev=>prev.filter(item=>item!==id));

};

const toggleDislike=id=>{

if(dislikedVideos.includes(id)){
setDislikedVideos(prev=>prev.filter(item=>item!==id));
return;
}

setDislikedVideos(prev=>[...prev,id]);
setLikedVideos(prev=>prev.filter(item=>item!==id));

};

return(
<VideoActionsContext.Provider
value={{
likedVideos,
dislikedVideos,
toggleLike,
toggleDislike
}}
>
{children}
</VideoActionsContext.Provider>
);

};

export const useVideoActions=()=>useContext(VideoActionsContext);