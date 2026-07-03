import "./index.scss";

const Skeleton=({count=12})=>{
return(
<div className="skeleton-grid" aria-hidden="true">
{Array.from({length:count}).map((_,index)=>(
<div className="skeleton-card" key={index}>
<div className="skeleton-thumbnail"></div>
<div className="skeleton-content">
<div className="skeleton-avatar"></div>
<div className="skeleton-info">
<div className="skeleton-line title"></div>
<div className="skeleton-line small"></div>
<div className="skeleton-line tiny"></div>
</div>
</div>
</div>
))}
</div>
);
};

export default Skeleton;