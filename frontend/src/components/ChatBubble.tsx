import '../css/ChatBubble.css'

/*
 * The component that denotes who the chat is from and the message.
 */
export default function ChatBubble({ speaker, message }) {
    return (
        <div className={"ChatBubble_Container"}>
            <h3 className={"ChatBubble_From"}>{speaker}</h3>
            <p className={"ChatBubble_Text"}>{message}</p>
        </div>
    );
    // Add button for it to speak the text again
    // Add purple/white left/right formatting for user/ai
    // Add ... for while the AI is getting a response
}