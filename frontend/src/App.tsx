import './App.css';
import HeaderCard from "./components/HeaderCard.tsx";
import Speak from "./components/Speak.tsx";
import Settings from "./components/Settings.tsx";
import TranscriptLog from "./components/TranscriptLog.tsx";
import ChatLog from "./components/ChatLog";
import { useState, useRef } from 'react';

// interface for the Messages from the user and the AI.
export interface Message {
    id: number; // set based on the conversation length
    speaker: string; // to show who the message is from
    text: string; // the message content
};

/*
 * The main app that holds all the components within the body tag.
 */
function App() {

    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [fullTranscript, setFullTranscript] = useState('');
    const [conversation, setConversation] = useState<Message[]>([]);
    const [isNoisy, setIsNoisy] = useState(true);
    const [isSpeakBack, setIsSpeakBack] = useState(true);
    const [isSendToAI, setIsSendToAI] = useState(false);
    const practiceLangRef = useRef("en-US");

    return (
        <div className={"App_Total"}>
            <div className={"App_UpperPart"}>
                <HeaderCard/>
                <Speak isRecording={isRecording} setIsRecording={setIsRecording}
                    transcript={transcript} setTranscript={setTranscript} fullTranscript={fullTranscript}
                       setFullTranscript={setFullTranscript} conversation={conversation}
                       setConversation={setConversation} isNoisy={isNoisy} practiceLangRef={practiceLangRef}
                       isSpeakBack={isSpeakBack} isSendToAI={isSendToAI} setIsSendToAI={setIsSendToAI}/>
                <Settings isNoisy={isNoisy} setIsNoisy={setIsNoisy} practiceLangRef={practiceLangRef}
                          isSpeakBack={isSpeakBack} setIsSpeakBack={setIsSpeakBack}/>
            </div>
            <div className={"App_LowerPart"}>
                <TranscriptLog transcript={transcript} fullTranscript={fullTranscript}/>
                <ChatLog conversation={conversation} setConversation={conversation} setIsSendToAI={setIsSendToAI}
                         setFullTranscript={setFullTranscript}/>
            </div>
        </div>
    )
}

export default App
