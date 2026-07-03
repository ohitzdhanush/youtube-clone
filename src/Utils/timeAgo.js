const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const years = Math.floor(seconds / 31536000);
  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;

  const months = Math.floor(seconds / 2592000);
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;

  const days = Math.floor(seconds / 86400);
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;

  const hours = Math.floor(seconds / 3600);
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

  return "Just now";
};

export default timeAgo;