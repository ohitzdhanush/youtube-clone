import { SidebarProvider } from "./sidebarcontext";
import { SearchProvider } from "./search";
import { ThemeProvider } from "./themecontext";
import { WatchLaterProvider } from "./watchlater";
import { LikedVideosProvider } from "./likedvideos";
import { HistoryProvider } from "./history";
import { AuthProvider } from "./authcontext";

const AppProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <SearchProvider>
          <WatchLaterProvider>
            <LikedVideosProvider>
              <HistoryProvider>
                <AuthProvider>
            {children}
            </AuthProvider>
            </HistoryProvider>
            </LikedVideosProvider>
            </WatchLaterProvider>
            </SearchProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default AppProvider;