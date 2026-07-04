import "./index.scss";
import { useNavigate } from "react-router-dom";
import formatViews from "../../Utils/formatViews";
import timeAgo from "../../Utils/timeAgo";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const { snippet, statistics, channelImage } = video;

  const videoId = video.id.videoId || video.id;

  const handleVideo = () => {
    navigate(`/video/${videoId}`);
  };

  return (
    <div className="video-card" onClick={handleVideo}>
      <div className="video-card__thumbnail">
        <img
          src={snippet.thumbnails.high.url}
          alt={snippet.title}
        />
      </div>

      <div className="video-card__details">
        <img
          src={channelImage}
          alt={snippet.channelTitle}
          className="channel-image"
        />

        <div className="video-info">
          <h3>{snippet.title}</h3>

          <p
          onClick={(e)=>{
            e.stopPropagation();
              navigate(`/channel/${snippet.channelId}`);}}>{snippet.channelTitle}</p>
          <span>
            {statistics
              ? `${formatViews(statistics.viewCount)} views • ${timeAgo(
                  snippet.publishedAt
                )}`
              : timeAgo(snippet.publishedAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;