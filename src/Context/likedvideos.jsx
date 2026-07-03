import { createContext, useContext, useEffect, useState } from "react";

const LikedVideosContext=createContext();

export const LikedVideosProvider=({children})=>{

const [likedVideos,setLikedVideos]=useState(()=>{
const saved=localStorage.getItem("likedVideos");
return saved?JSON.parse(saved):[];
});

useEffect(()=>{
localStorage.setItem("likedVideos",JSON.stringify(likedVideos));
},[likedVideos]);

const addLikedVideo=(video)=>{
const exists=likedVideos.find(item=>item.id===video.id);
if(exists)return;
setLikedVideos([...likedVideos,video]);
};

const removeLikedVideo=(id)=>{
setLikedVideos(likedVideos.filter(video=>video.id!==id));
};

const isLiked=(id)=>{
return likedVideos.some(video=>video.id===id);
};

return(
<LikedVideosContext.Provider
value={{
likedVideos,
addLikedVideo,
removeLikedVideo,
isLiked
}}
>
{children}
</LikedVideosContext.Provider>
);

};

export const useLikedVideos=()=>useContext(LikedVideosContext);