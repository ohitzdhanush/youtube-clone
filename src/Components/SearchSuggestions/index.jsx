import "./index.scss";
import {IoSearch} from "react-icons/io5";

const SearchSuggestions=({
suggestions=[],
onSelect,
activeIndex=-1
})=>{

if(suggestions.length===0)return null;

return(
<div className="search-suggestions">

{suggestions.map((item,index)=>(

<button
key={`${item}-${index}`}
type="button"
className={`suggestion ${activeIndex===index?"active":""}`}
onClick={()=>onSelect(item)}
>

<IoSearch/>

<span>{item}</span>

</button>

))}

</div>
);

};

export default SearchSuggestions;