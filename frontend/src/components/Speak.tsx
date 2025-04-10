import '../css/Speak.css';
import {useState, useEffect, useRef} from "react";

/*
 * Houses the buttons that record the users speech and send it to the AI.
 */
export default function Speak({isRecording, setIsRecording, transcript, setTranscript, fullTranscript,
                                  setFullTranscript, conversation, setConversation, isNoisy}) {

    const isNoisyRef = useRef(isNoisy);

    const speechRecognitionRef = useRef(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    let audioChunksRef: Blob[] = useRef<Blob[]>([]);
    let blob: Blob = new Blob(audioChunksRef.current, {type: 'audio/wav'});

    async function setMediaRecorder() {
        var stream = await navigator.mediaDevices.getUserMedia({audio: true});
        var mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
            console.log("Chunk pushed:", event.data);
        };

        mediaRecorderRef.current = mediaRecorder;
    }

    useEffect(() => {
        setMediaRecorder();
        setUpRecognition();
    }, []);

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
    function startRecording() {
        audioChunksRef.current = [];
        if(mediaRecorderRef.current){
            mediaRecorderRef.current.start(1000);
            console.log("recording started");
        } else {
            console.log("mediaRecorder is not initialized.")
        }
    }

    // Stops the recording of the media recording
    function stopRecording() {
        const currBlob = new Blob(audioChunksRef.current, {type: 'audio/wav'});
        console.log("audio chunks: " + audioChunksRef.current.length);
        console.log(currBlob.size);
        // If you need to test the playback uncommend below
        /*const audioURL = URL.createObjectURL(currBlob);
        const audio = new Audio(audioURL);
        audio.play();*/

        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            console.log("recording stopped");
            mediaRecorderRef.current.stop();
        }

        audioTranscribe();
    }

    // Sends results to a python backend for Whisper
    const audioTranscribe = async () => {
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
            await setFullTranscript(result.transcription);
        } catch (error) {
            console.error('Error uploading audio:', error);
        }
    };



    // When send results button is clicked, this uses a POST to send the transcript to the back end Flask restAPI.
    const sendResultsToAI= async () => {
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
            audioChunksRef.current = [];
            blob = new Blob(audioChunksRef.current, {type: 'audio/wav'});
            //setBlob(new Blob(audioChunks, {type: 'audio/wav'}));
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
                <button className={"Speak_OtherButtons"} onClick={sendResultsToAI}>Send</button>
                <button className={"Speak_OtherButtons"} onClick={resetTranscription}>Reset</button>
            </div>
        </div>
    );
}
