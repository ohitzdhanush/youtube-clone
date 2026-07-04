import "./index.scss";
import {useState,useEffect} from "react";
import {FaThumbsUp,FaThumbsDown} from "react-icons/fa";
import commentsData from "../../Data/comments";

const Comments=()=>{

const[comments,setComments]=useState(()=>{
const saved=localStorage.getItem("youtube-comments");
return saved?JSON.parse(saved):commentsData;
});

const[input,setInput]=useState("");
const[replyText,setReplyText]=useState("");
const[replyId,setReplyId]=useState(null);

useEffect(()=>{
localStorage.setItem("youtube-comments",JSON.stringify(comments));
},[comments]);

const addComment=()=>{

if(!input.trim())return;

const newComment={
id:Date.now(),
name:"You",
avatar:"https://i.pravatar.cc/150?img=60",
comment:input,
likes:0,
liked:false,
time:"Just now",
replies:[]
};

setComments([newComment,...comments]);

setInput("");

};

const toggleLike=id=>{

setComments(prev=>
prev.map(comment=>{

if(comment.id!==id)return comment;

return{
...comment,
liked:!comment.liked,
likes:comment.liked?comment.likes-1:comment.likes+1
};

})
);

};

const addReply=id=>{

if(!replyText.trim())return;

setComments(prev=>
prev.map(comment=>{

if(comment.id!==id)return comment;

return{
...comment,
replies:[
...comment.replies,
{
id:Date.now(),
name:"You",
avatar:"https://i.pravatar.cc/150?img=60",
comment:replyText,
likes:0,
liked:false,
time:"Just now"
}
]
};

})
);

setReplyText("");
setReplyId(null);

};

return(

<div className="comments">

<h3>{comments.length} Comments</h3>

<div className="comment-input">

<img
src="https://i.pravatar.cc/150?img=60"
alt=""
/>

<input
type="text"
placeholder="Add a comment..."
value={input}
onChange={e=>setInput(e.target.value)}
onKeyDown={e=>{
if(e.key==="Enter"){
addComment();
}
}}
/>

<button onClick={addComment}>
Comment
</button>

</div>

<div className="comments-list">

{comments.map(comment=>(

<div
className="comment"
key={comment.id}
>

<img
src={comment.avatar}
alt=""
/>

<div className="comment-body">

<h4>

{comment.name}

<span>{comment.time}</span>

</h4>

<p>{comment.comment}</p>

<div className="comment-actions">

<button
onClick={()=>toggleLike(comment.id)}
>

<FaThumbsUp/>

<span>{comment.likes}</span>

</button>

<button>

<FaThumbsDown/>

</button>

<button
onClick={()=>setReplyId(
replyId===comment.id?null:comment.id
)}
>

Reply

</button>

</div>

{replyId===comment.id&&(

<div className="reply-input">

<input
type="text"
placeholder="Write a reply..."
value={replyText}
onChange={e=>setReplyText(e.target.value)}
onKeyDown={e=>{
if(e.key==="Enter"){
addReply(comment.id);
}
}}
/>

<button
onClick={()=>addReply(comment.id)}
>

Reply

</button>

</div>

)}

{comment.replies.length>0&&(

<div className="replies">

{comment.replies.map(reply=>(

<div
className="reply"
key={reply.id}
>

<img
src={reply.avatar}
alt=""
/>

<div className="reply-body">

<h5>

{reply.name}

<span>{reply.time}</span>

</h5>

<p>{reply.comment}</p>

<div className="comment-actions">

<button>

<FaThumbsUp/>

<span>{reply.likes}</span>

</button>

<button>

<FaThumbsDown/>

</button>

</div>

</div>

</div>

))}

</div>

)}

</div>

</div>

))}

</div>

</div>

);

};

export default Comments;