import { SidebarProvider } from "./sidebarcontext";
import { SearchProvider } from "./search";
import { ThemeProvider } from "./themecontext";
import { WatchLaterProvider } from "./watchlater";
import { LikedVideosProvider } from "./likedvideos";
import { HistoryProvider } from "./history";

const AppProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <SearchProvider>
          <WatchLaterProvider>
            <LikedVideosProvider>
              <HistoryProvider>
            {children}
            </HistoryProvider>
            </LikedVideosProvider>
            </WatchLaterProvider>
            </SearchProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default AppProvider;