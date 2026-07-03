import "./index.scss";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";

import { useWatchLater } from "../../Context/watchlater";

import formatViews from "../../Utils/formatViews";
import timeAgo from "../../Utils/timeAgo";

const WatchLater = () => {
  const navigate = useNavigate();

  const {
    watchLater,
    removeFromWatchLater,
  } = useWatchLater();

  return (
    <>
      <Navbar />

      <div className="watch-later-page">

        <Sidebar />

        <main className="watch-later-content">

          <h2>Watch Later</h2>

          {watchLater.length === 0 ? (

            <div className="empty">

              <h3>No saved videos</h3>

              <p>Save videos to watch them later.</p>

            </div>

          ) : (

            watchLater.map((video) => (

              <div
                className="watch-item"
                key={video.id}
              >

                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  onClick={() => navigate(`/video/${video.id}`)}
                />

                <div
                  className="info"
                  onClick={() => navigate(`/video/${video.id}`)}
                >

                  <h3>{video.snippet.title}</h3>

                  <p>{video.snippet.channelTitle}</p>

                  <span>

                    {formatViews(video.statistics.viewCount)}
                    {" "}views •{" "}
                    {timeAgo(video.snippet.publishedAt)}

                  </span>

                </div>

                <button
                  onClick={() =>
                    removeFromWatchLater(video.id)
                  }
                >

                  <MdDelete />

                </button>

              </div>

            ))

          )}

        </main>

      </div>
    </>
  );
};

export default WatchLater;