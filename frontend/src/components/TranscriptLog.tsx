import '../css/TranscriptLog.css'

export function TranscriptLog({transcript, fullTranscript}) {
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