import { useState } from 'react'
import './App.css'
import {HeaderCard} from "./components/HeaderCard.tsx";
import Speak from "./components/Speak.tsx";
import {Settings} from "./components/Settings.tsx";
import {TranscriptLog} from "./components/TranscriptLog.tsx";
import ChatLog from "./components/ChatLog.tsx";

function App() {

  return (
    <div className={"App_Total"}>
        <div className={"App_UpperPart"}>
            <HeaderCard></HeaderCard>
            <Speak></Speak>
            <Settings></Settings>
        </div>
        <div className={"App_LowerPart"}>
            <TranscriptLog></TranscriptLog>
            <ChatLog></ChatLog>
        </div>
    </div>
  )
}

export default App
