import "../css/TextChat.css";
import { useRef } from "react";

export default function TextChat( { setIsSendToAI, setFullTranscript } ) {

    const textInputRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        setFullTranscript(textInputRef.current.value);
        setIsSendToAI(true);
        if (textInputRef.current) {
            textInputRef.current.value = "";
        }
    }

    return(
        <form className={"TextChat-Form"} onSubmit={handleSubmit}>
            <textarea className={"TextChat-UserInput"} ref={textInputRef}></textarea>
            <button className={"TextChat-Submit"} type={"submit"}>
                <span className={"TextChat-SubmitText"}>&#x2192;</span>
            </button>
        </form>
    );
}