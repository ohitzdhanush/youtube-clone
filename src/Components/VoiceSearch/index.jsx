import "./index.scss";
import {useEffect} from "react";
import {FaMicrophone} from "react-icons/fa";
import useVoiceSearch from "../../Hooks/useVoiceSearch";

const VoiceSearch=({open,onClose,onSearch})=>{

const{
listening,
transcript,
startListening
}=useVoiceSearch();

useEffect(()=>{

if(open){
startListening();
}

},[open]);

useEffect(()=>{

if(transcript&&!listening){
onSearch(transcript);
onClose();
}

},[transcript,listening]);

if(!open)return null;

return(
<div className="voice-overlay">

<div className="voice-box">

<div className={`mic ${listening?"active":""}`}>

<FaMicrophone/>

</div>

<h2>
Listening...
</h2>

<p>
{transcript||"Speak now"}
</p>

<button onClick={onClose}>
Cancel
</button>

</div>

</div>
);

};

export default VoiceSearch;