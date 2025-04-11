import '../css/TranscriptLog.css'

/*
 * The compoent that shows the user the interim transcript and the final transcript,
 * so that the user can see what they are saying realtime and what they will be sending
 * to the AI before it is sent.
 */
export default function TranscriptLog({transcript, fullTranscript}) {
    return (
        <div className={"TranscriptLog_Container"}>
            <div className={"TranscriptLog_InterimContainer"}>
                <h2>Concurrent Transcription</h2>
                <p className={"TranscriptLog_Text"}>{transcript}</p>
            </div>
            <div className={"TranscriptLog_FullContainer"}>
                <h2>Full Transcription</h2>
                <p className={"TranscriptLog_Text"}>{fullTranscript}</p>
            </div>
        </div>
    );
}