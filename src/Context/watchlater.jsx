import { createContext, useContext, useEffect, useState } from "react";

const WatchLaterContext = createContext();

export const WatchLaterProvider = ({ children }) => {
  const [watchLater, setWatchLater] = useState(() => {
    const saved = localStorage.getItem("watchLater");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "watchLater",
      JSON.stringify(watchLater)
    );
  }, [watchLater]);

  const addToWatchLater = (video) => {
    const exists = watchLater.find((item) => item.id === video.id);

    if (exists) return;

    setWatchLater([...watchLater, video]);
  };

  const removeFromWatchLater = (id) => {
    setWatchLater(
      watchLater.filter((video) => video.id !== id)
    );
  };

  const isSaved = (id) => {
    return watchLater.some((video) => video.id === id);
  };

  return (
    <WatchLaterContext.Provider
      value={{
        watchLater,
        addToWatchLater,
        removeFromWatchLater,
        isSaved,
      }}
    >
      {children}
    </WatchLaterContext.Provider>
  );
};

export const useWatchLater = () =>
  useContext(WatchLaterContext);