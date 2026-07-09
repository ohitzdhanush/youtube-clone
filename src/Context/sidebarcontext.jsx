import {createContext,useContext,useState,useEffect} from "react";
const SidebarContext=createContext();
export const SidebarProvider=({children})=>{
const[isOpen,setIsOpen]=useState(window.innerWidth>992);

useEffect(()=>{
const handleResize=()=>{

if(window.innerWidth>992){
setIsOpen(true);
}else{
setIsOpen(false);
}
};

handleResize();
window.addEventListener("resize",handleResize);
return()=>window.removeEventListener("resize",handleResize);},[]);
const toggleSidebar=()=>{
setIsOpen(prev=>!prev);
};

const closeSidebar=()=>{
if(window.innerWidth<=992){
setIsOpen(false);
}
};
return(<SidebarContext.Provider value={{isOpen,toggleSidebar,closeSidebar}}>{children}</SidebarContext.Provider>
);
};

export const useSidebar=()=>useContext(SidebarContext);