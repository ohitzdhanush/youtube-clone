import {createContext,useContext,useEffect,useState} from "react";

const NotificationContext=createContext();

export const NotificationProvider=({children})=>{

const[notifications,setNotifications]=useState(()=>{
return JSON.parse(localStorage.getItem("notifications"))||[];
});

useEffect(()=>{
localStorage.setItem("notifications",JSON.stringify(notifications));
},[notifications]);

const addNotification=(title,message,type="default")=>{
const item={
id:Date.now(),
title,
message,
type,
time:new Date().toLocaleString(),
read:false
};
setNotifications(prev=>[item,...prev]);
};

const markAsRead=id=>{
setNotifications(prev=>
prev.map(item=>
item.id===id
?{...item,read:true}
:item
)
);
};

const markAllRead=()=>{
setNotifications(prev=>
prev.map(item=>({
...item,
read:true
}))
);
};

const deleteNotification=id=>{
setNotifications(prev=>
prev.filter(item=>item.id!==id)
);
};

const clearNotifications=()=>{
setNotifications([]);
};

return(
<NotificationContext.Provider
value={{
notifications,
addNotification,
markAsRead,
markAllRead,
deleteNotification,
clearNotifications
}}
>
{children}
</NotificationContext.Provider>
);

};

export const useNotification=()=>useContext(NotificationContext);