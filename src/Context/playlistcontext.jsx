import {createContext,useContext,useEffect,useState} from "react";

const PlaylistContext=createContext();

export const PlaylistProvider=({children})=>{

const[playlists,setPlaylists]=useState(()=>{
return JSON.parse(localStorage.getItem("playlists"))||[];
});

useEffect(()=>{
localStorage.setItem("playlists",JSON.stringify(playlists));
},[playlists]);

const createPlaylist=name=>{

if(!name.trim())return;

const exists=playlists.find(
item=>item.name.toLowerCase()===name.toLowerCase()
);

if(exists)return;

setPlaylists(prev=>[
...prev,
{
id:Date.now(),
name,
videos:[]
}
]);

};

const addVideoToPlaylist=(playlistId,video)=>{

setPlaylists(prev=>
prev.map(playlist=>{

if(playlist.id!==playlistId)return playlist;

const exists=playlist.videos.find(v=>v.id===video.id);

if(exists)return playlist;

return{
...playlist,
videos:[...playlist.videos,video]
};

})
);

};

const removeVideo=(playlistId,videoId)=>{

setPlaylists(prev=>
prev.map(playlist=>{

if(playlist.id!==playlistId)return playlist;

return{
...playlist,
videos:playlist.videos.filter(v=>v.id!==videoId)
};

})
);

};

const deletePlaylist=id=>{
setPlaylists(prev=>prev.filter(item=>item.id!==id));
};

return(
<PlaylistContext.Provider
value={{
playlists,
createPlaylist,
addVideoToPlaylist,
removeVideo,
deletePlaylist
}}
>
{children}
</PlaylistContext.Provider>
);

};

export const usePlaylist=()=>useContext(PlaylistContext);