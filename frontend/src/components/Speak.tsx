import '../css/Speak.css';
import {useState, useEffect, useRef} from "react";

/*
 * Houses the buttons that record the users speech and send it to the AI.
 */
export default function Speak({isRecording, setIsRecording, transcript, setTranscript, fullTranscript,
                                  setFullTranscript, conversation, setConversation, isNoisy}) {

    // The different state values used for getting the data for the Speech Recognition API and Whisper API
    const [audioChunks, setAudioChunks] = useState([]);
    const [blob, setBlob] = useState(new Blob(audioChunks, {type: 'audio/wav'}));
    const mediaRecorderRef = useRef(null);

    const speechRecognitionRef = useRef(null);

    const isNoisyRef = useRef(isNoisy);

    /* 
        Sets up the speech recognition.
    */
    function setUpRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        speechRecognitionRef.current = recognition;
        
        // Sets language and how its being recorded/
        recognition.lang = "en-US"; //"es-mx";en-US
        recognition.continuous = true;
        recognition.interimResults = true;

        // This sets the transcript as the user is talking.
        recognition.onresult = (event) => {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i];
                interimTranscript += result[0].transcript;
                if(event.results[i].isFinal) {
                    console.log("is noisy is " + isNoisyRef.current);
                    if(isNoisyRef.current) { // will use the Speech Rec for fullTranscript if it's noisy.
                        setFullTranscript(prevState => prevState + event.results[i][0].transcript + ". ");
                    }
                }
            }
            setTranscript(interimTranscript);
        };

        // If error occurs during the speech recognition
        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
        };

        // Restarts if the recording continues
        recognition.onend = () => {
            if(isRecording){
                setFullTranscript(prevState => prevState  + transcript);
                recognition.start();
            } else {
                recognition.stop();
            }

        };
    }

    /*
        Sets up the audio file creation and recording for Whisper.
     */
    // Starts the media recording and sets what happens when its recording and when it's not recording.
    async function startRecording() {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true});
        const mediaRecorder = new MediaRecorder(stream);

        //console.log("Media recorder created")

        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
            setAudioChunks([...audioChunks, event.data]);
            //console.log("Audio chunks length: " + audioChunks.length);
        };

        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, {type: 'audio/wav'});
            //console.log("Blob created.")
            await setBlob(audioBlob);
        };

        mediaRecorder.start();
        console.log("recording");
        //console.log("Recorder State:", mediaRecorder?.state);
    }

    // Stops the recording of the media recording
    function stopRecording() {
        //console.log("stop recording called");
        // console.log("Recorder State:", mediaRecorderRef.current?.state);
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            console.log("recording stopped");
            mediaRecorderRef.current.stop();
        }


        if (blob.size == 0) {
            console.log("blob is empty");
        } else {
            console.log("blob is NOT empty");
        }
    }

    const sendResults = () => {
        if (isNoisy) {
            sendResultsNoisy();
        } else {
            sendResultsQuiet();
        }
    }

    // Sends results to a python backend for Whisper
    const sendResultsQuiet = async () => {
        const formData = new FormData();
        formData.append('file', blob, 'speech.wav');

        try {
            const response = await fetch('http://localhost:8500/api/transcribe', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            const result = await response.json();
            console.log('Transcription', result.transcription);
            //setTranscript(result.transcription)
        } catch (error) {
            console.error('Error uploading audio:', error);
        }
    };



    // When send results button is clicked, this uses a POST to send the transcript to the back end Flask restAPI.
    const sendResultsNoisy = async () => {
        try {
            const response = await fetch('http://localhost:9000/api/llamaResponse', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: fullTranscript })
            });
            const result = await response.json();
            console.log('Model Response:', result.modelResponse);
            setConversation([...conversation, fullTranscript, result.modelResponse]);
            setFullTranscript("");
        } catch (error) {
            console.error('Error uploading transcription:', error);
        }
    }

    // Resets the transcipt if the user isn't satisfied with the transciption.
    const resetTranscription = () => {
        if(!isNoisy) {
            setBlob(new Blob(audioChunks, {type: 'audio/wav'}));
        }
        setTranscript('');
        setFullTranscript('');
    };

    useEffect(() => {
        if(speechRecognitionRef.current){
            if (isRecording) {
                //startRecording();
                speechRecognitionRef.current.start();
                console.log("recognition started");
                if(!isNoisy) {
                    startRecording();
                }
            } else {
                //stopRecording();
                speechRecognitionRef.current.stop();
                console.log("recognition ended");
                if(!isNoisy) {
                    stopRecording();
                }
            }
        } else {
            setUpRecognition();
        }
    }, [isRecording]);

    useEffect(() => {
        resetTranscription();
        isNoisyRef.current = isNoisy;
        // perhaps set a resetTranscript if they click this and set the record button to REC
    }, [isNoisy]);

    // Record changes to stop recording to send. Reset stays the same.
    return (
        <div className={"Speak_Container"}>
            <button
                onClick={() => setIsRecording(!isRecording)}
                className={"Speak_Recorder"}
            >
                {isRecording ? '\u25A0' : 'REC'}
            </button>
            <div className={"Speak_OtherButtons_Container"}>
                <button className={"Speak_OtherButtons"} onClick={sendResults}>Send</button>
                <button className={"Speak_OtherButtons"} onClick={resetTranscription}>Reset</button>
            </div>
        </div>
    );
}
