import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import "./index.css";

import App from "./App";

import {AuthProvider} from "./Context/authcontext";
import {SidebarProvider} from "./Context/sidebarcontext";
import {ThemeProvider} from "./Context/themecontext";
import {SearchProvider} from "./Context/search";
import {WatchLaterProvider} from "./Context/watchlater";
import {LikedVideosProvider} from "./Context/likedvideos";
import {HistoryProvider} from "./Context/history";

ReactDOM.createRoot(document.getElementById("root")).render(
<BrowserRouter>
<AuthProvider>
<ThemeProvider>
<SidebarProvider>
<SearchProvider>
<WatchLaterProvider>
<LikedVideosProvider>
<HistoryProvider>

<App/>

</HistoryProvider>
</LikedVideosProvider>
</WatchLaterProvider>
</SearchProvider>
</SidebarProvider>
</ThemeProvider>
</AuthProvider>
</BrowserRouter>
);