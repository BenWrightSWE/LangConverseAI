import './App.css'
import HeaderCard from "./components/HeaderCard.tsx";
import Speak from "./components/Speak.tsx";
import Settings from "./components/Settings.tsx";
import TranscriptLog from "./components/TranscriptLog.tsx";
import ChatLog from "./components/ChatLog";
import { useState } from 'react'

export interface Message {
    id: number;
    speaker: string;
    text: string;
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

    return (
        <div className={"App_Total"}>
            <div className={"App_UpperPart"}>
                <HeaderCard/>
                <Speak isRecording={isRecording} setIsRecording={setIsRecording}
                    transcript={transcript} setTranscript={setTranscript} fullTranscript={fullTranscript} setFullTranscript={setFullTranscript}
                    conversation={conversation} setConversation={setConversation} isNoisy={isNoisy}/>
                <Settings isNoisy={isNoisy} setIsNoisy={setIsNoisy}/>
            </div>
            <div className={"App_LowerPart"}>
                <TranscriptLog transcript={transcript} fullTranscript={fullTranscript}/>
                <ChatLog conversation={conversation} setConversation={conversation}></ChatLog>
            </div>
        </div>
    )
}

export default App
