import {useEffect,useRef,useState} from "react";

const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;

const useVoiceSearch=()=>{

const[listening,setListening]=useState(false);
const[transcript,setTranscript]=useState("");

const recognitionRef=useRef(null);

useEffect(()=>{

if(!SpeechRecognition)return;

const recognition=new SpeechRecognition();

recognition.lang="en-IN";
recognition.interimResults=true;
recognition.continuous=false;

recognition.onstart=()=>{
setListening(true);
};

recognition.onresult=e=>{

let text="";

for(let i=e.resultIndex;i<e.results.length;i++){
text+=e.results[i][0].transcript;
}

setTranscript(text);

};

recognition.onend=()=>{
setListening(false);
};

recognitionRef.current=recognition;

},[]);

const startListening=()=>{

if(recognitionRef.current){
setTranscript("");
recognitionRef.current.start();
}

};

const stopListening=()=>{

if(recognitionRef.current){
recognitionRef.current.stop();
}

};

return{
listening,
transcript,
startListening,
stopListening
};

};

export default useVoiceSearch;