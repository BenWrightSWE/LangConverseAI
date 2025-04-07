import '../css/ChatBubble.css'

export function ChatBubble() {
    return (
        <div className={"ChatBubble_Container"}>
            <h3 className={"ChatBubble_From"}>User:</h3>
            <p className={"ChatBubble_Text"}>This is a representation of a users message.</p>
        </div>
    );
    /* Add button for it to speak the text again */
}