import { useState } from 'react'
import './App.css'
import {HeaderCard} from "./components/HeaderCard.tsx";
import Speak from "./components/Speak.tsx";
import {Settings} from "./components/Settings.tsx";
import {TranscriptLog} from "./components/TranscriptLog.tsx";
import ChatLog from "./components/ChatLog.tsx";

function App() {

    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [fullTranscript, setFullTranscript] = useState('');
    const [conversation, setConversation] = useState([]);

    return (
        <div className={"App_Total"}>
            <div className={"App_UpperPart"}>
                <HeaderCard></HeaderCard>
                <Speak isRecording={isRecording} setIsRecording={setIsRecording}
                    setTranscript={setTranscript} setFullTranscript={setFullTranscript}
                    conversation={conversation} setConversation={setConversation}/>
                <Settings></Settings>
            </div>
            <div className={"App_LowerPart"}>
                <TranscriptLog transcript={transcript} fullTranscript={fullTranscript}/>
                <ChatLog></ChatLog>
            </div>
        </div>
    );
}

export default App
