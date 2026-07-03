import { createContext,useContext,useEffect,useState } from "react";

const HistoryContext=createContext();

export const HistoryProvider=({children})=>{

const [history,setHistory]=useState(()=>{
const saved=localStorage.getItem("history");
return saved?JSON.parse(saved):[];
});

useEffect(()=>{
localStorage.setItem("history",JSON.stringify(history));
},[history]);

const addHistory=(video)=>{
if(!video)return;

setHistory(prev=>{

const filtered=prev.filter(item=>item.id!==video.id);

return [video,...filtered];

});

};

const removeHistory=(id)=>{
setHistory(prev=>prev.filter(video=>video.id!==id));
};

const clearHistory=()=>{
setHistory([]);
};

return(
<HistoryContext.Provider
value={{
history,
addHistory,
removeHistory,
clearHistory
}}
>
{children}
</HistoryContext.Provider>
);

};

export const useHistoryVideos=()=>useContext(HistoryContext);