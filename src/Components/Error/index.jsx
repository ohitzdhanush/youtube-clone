import "./index.scss";
import { MdErrorOutline } from "react-icons/md";

const Error = ({ message, onRetry }) => {
  return (
    <div className="error-page">
      <MdErrorOutline className="error-icon" />

      <h2>Oops!</h2>

      <p>{message}</p>

      <button onClick={onRetry}>
        Retry
      </button>
    </div>
  );
};

export default Error;