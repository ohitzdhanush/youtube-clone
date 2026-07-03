import "./index.scss";

const categories = [
  "All",
  "Music",
  "Gaming",
  "Movies",
  "Live",
  "News",
  "React",
  "Java",
  "Spring Boot",
  "JavaScript",
  "CSS",
  "AI",
  "Podcasts",
  "Cricket",
  "Tamil",
  "Recently Uploaded"
];

const CategoryBar = () => {
  return (
    <div className="category">
      {categories.map((item, index) => (
        <button
          key={index}
          className={index === 0 ? "active" : ""}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;