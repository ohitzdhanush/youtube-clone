import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import "./index.css";
import App from "./App";
import {Toaster} from "react-hot-toast";
import {AuthProvider} from "./Context/authcontext";
import {SidebarProvider} from "./Context/sidebarcontext";
import {ThemeProvider} from "./Context/themecontext";
import {SearchProvider} from "./Context/search";
import {WatchLaterProvider} from "./Context/watchlater";
import {LikedVideosProvider} from "./Context/likedvideos";
import {HistoryProvider} from "./Context/history";
import {VideoActionsProvider} from "./Context/videoactions";
import {PlaylistProvider} from "./Context/playlistcontext";
import {NotificationProvider} from "./Context/notificationcontext";

ReactDOM.createRoot(document.getElementById("root")).render(
<BrowserRouter>
<AuthProvider>
<ThemeProvider>
<SidebarProvider>
<SearchProvider>
<WatchLaterProvider>
<LikedVideosProvider>
<HistoryProvider>
<VideoActionsProvider>
<PlaylistProvider>
<NotificationProvider>
<App/>
<Toaster
position="bottom-center"
toastOptions={{
duration:2000,
style:{
background:"#202020",
color:"#fff",
borderRadius:"12px"
}
}}
/>
</NotificationProvider>
</PlaylistProvider>
</VideoActionsProvider>
</HistoryProvider>
</LikedVideosProvider>
</WatchLaterProvider>
</SearchProvider>
</SidebarProvider>
</ThemeProvider>
</AuthProvider>
</BrowserRouter>
);