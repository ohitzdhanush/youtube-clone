import "./index.scss";
import {useState} from "react";

const categories=[
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
const CategoryBar=()=>{
const[selected,setSelected]=useState("All");
return(
<div className="category">
{categories.map(item=>(
<button
key={item}
className={selected===item?"active":""}
onClick={()=>setSelected(item)}
>
{item}
</button>
))}
</div>
);

};

export default CategoryBar;