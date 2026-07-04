import "./index.scss";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import {FaBell,FaTrash} from "react-icons/fa";
import {useNotification} from "../../Context/notificationcontext";

const Notifications=()=>{
const{notifications,markAsRead,markAllRead,deleteNotification,clearNotifications}=useNotification();

return(
<>
<Navbar/>
<div className="notifications-page">
<Sidebar/>
<div className="notifications-content">
<div className="notifications-header">
<h2>Notifications</h2>
<div className="notification-actions">
<button onClick={markAllRead}>Mark All Read</button>
<button onClick={clearNotifications}>Clear All</button>
</div>
</div>
{notifications.length===0?(
<div className="empty-notifications">
<FaBell/>
<h3>No Notifications</h3>
<p>You're all caught up.</p>
</div>
):(
<div className="notifications-list">
{notifications.map(item=>(
<div className={`notification-card ${item.read?"":"unread"}`} key={item.id}>
<div className="notification-info" onClick={()=>markAsRead(item.id)}>
<h4>{item.title}</h4>
<p>{item.message}</p>
<span>{item.time}</span>
</div>
<button className="delete-btn" onClick={()=>deleteNotification(item.id)}>
<FaTrash/>
</button>
</div>
))}
</div>
)}
</div>
</div>
</>
);
};

export default Notifications;