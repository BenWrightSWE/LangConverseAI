//import {useState} from "react";
import '../css/ChatLog.css'
import {ChatBubble} from "./ChatBubble.tsx";

/*
 * Produces the chat log denoting the responses from the AI and the user.
 */
export default function ChatLog() {

    return (
        <section className={"ChatLog_Container"}>
            <h2>Chat Log</h2>
            <div className={"ChatLog_Log"}>
                <ChatBubble></ChatBubble>
                <ChatBubble></ChatBubble>
                <ChatBubble></ChatBubble>
                {/*
                    Use state to have a dynamic array for chat bubbles
                    Only do 3 for now, until you want to implement scrolling
                    components.

                    When it's a user's it will be light purple on the right
                    when it's the AI's it will be light grey on the left

                    Will speak back when the AI's is originally logged
                */}
            </div>
        </section>
    );
}