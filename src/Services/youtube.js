import axios from "axios";

const API_KEY=import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL="https://www.googleapis.com/youtube/v3";

const getChannelImages=async(channelIds)=>{
if(!channelIds.length)return{};

const response=await axios.get(`${BASE_URL}/channels`,{
params:{
part:"snippet",
id:channelIds.join(","),
key:API_KEY
}
});

const channelMap={};

response.data.items.forEach(channel=>{
channelMap[channel.id]=channel.snippet.thumbnails.default.url;
});

return channelMap;
};

export const getTrendingVideos=async(pageToken="",retry=0)=>{
try{

const response=await axios.get(`${BASE_URL}/videos`,{
params:{
part:"snippet,statistics",
chart:"mostPopular",
regionCode:"IN",
maxResults:20,
pageToken,
key:API_KEY
}
});

const videos=response.data.items;

const channelIds=[
...new Set(videos.map(v=>v.snippet.channelId))
];

const channelMap=await getChannelImages(channelIds);

return{
videos:videos.map(video=>({
...video,
channelImage:channelMap[video.snippet.channelId]
})),
nextPageToken:response.data.nextPageToken
};

}catch(error){

if(retry<2){
return getTrendingVideos(pageToken,retry+1);
}

console.log(error);

return{
videos:[],
nextPageToken:null
};

}
};

export const searchVideos=async(query,pageToken="")=>{
try{

const response=await axios.get(`${BASE_URL}/search`,{
params:{
part:"snippet",
maxResults:20,
q:query,
type:"video",
pageToken,
key:API_KEY
}
});

const videos=response.data.items;

const channelIds=[
...new Set(
videos.map(video=>video.snippet.channelId)
)
];

const channelMap=await getChannelImages(channelIds);

return{
videos:videos.map(video=>({
id:video.id.videoId,
snippet:video.snippet,
statistics:{
viewCount:"0",
likeCount:"0"
},
channelImage:channelMap[video.snippet.channelId]
})),
nextPageToken:response.data.nextPageToken
};

}catch(error){
console.log(error);
return{
videos:[],
nextPageToken:null
};
}
};
export const getVideoDetails=async(id)=>{
try{

const response=await axios.get(`${BASE_URL}/videos`,{
params:{
part:"snippet,statistics",
id,
key:API_KEY
}
});

return response.data.items[0];

}catch(error){
console.log(error);
return null;
}
};

export const getRelatedVideos=async(id)=>{
try{

if(!id)return[];

const response=await axios.get(`${BASE_URL}/search`,{
params:{
part:"snippet",
relatedToVideoId:id,
type:"video",
maxResults:12,
key:API_KEY
}
});

return response.data.items||[];

}catch(error){

if(error.response?.status===400){

try{

const video=await getVideoDetails(id);

if(!video)return[];

const response=await axios.get(`${BASE_URL}/search`,{
params:{
part:"snippet",
q:video.snippet.channelTitle,
type:"video",
maxResults:12,
key:API_KEY
}
});
return response.data.items||[];
}catch(err){
console.log(err);
return[];
}
}
console.log(error);
return[];
}
};
export const getSearchSuggestions=async(query)=>{
try{

if(!query.trim())return[];

const response=await axios.get(
`https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(query)}`
);

return response.data[1]||[];

}catch(error){
console.log(error);
return[];
}
};
export const getChannelDetails=async(channelId)=>{
try{

const response=await axios.get(`${BASE_URL}/channels`,{
params:{
part:"snippet,statistics,brandingSettings",
id:channelId,
key:API_KEY
}
});

return response.data.items[0];

}catch(error){
console.log(error);
return null;
}
};

export const getChannelVideos=async(channelId,pageToken="")=>{
try{

const response=await axios.get(`${BASE_URL}/search`,{
params:{
part:"snippet",
channelId,
type:"video",
order:"date",
maxResults:12,
pageToken,
key:API_KEY
}
});

return{
videos:response.data.items,
nextPageToken:response.data.nextPageToken
};

}catch(error){
console.log(error);
return{
videos:[],
nextPageToken:null
};
}
};