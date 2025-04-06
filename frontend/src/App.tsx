import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/Speak.tsx'
import './components/ChatLog.tsx'
import Speak from "./components/Speak.tsx";
import ChatLog from "./components/ChatLog.tsx";

function App() {

  return (
    <>
        <div className={"upperPart"}>

        </div>
        <div className={"lowerPart"}>
          <HeaderCard></HeaderCard>
          <Speak></Speak>
          <Settings></Settings>
          <div>
            <TranscriptLog></TranscriptLog>
            <ChatLog></ChatLog>
          </div>
        </div>
    </>
  )
}

export default App
