# <ins>Lang Converse AI</ins>

![Lang Converse AI's logo](./frontend/public/LCAI-Panel.png)

An application that uses AI to practice your language speaking.

## Table of Contents

* <ins>Use Guide</ins>
  * [Getting Started](#getting-started)
  * [How To Start Up](#start-up)
  * [How To Use The App](#use-app)
  * [How to Close Down the App](#close-app)
  * [Things To Be Aware Of](#aware-of)
  * [Ideas for Further Work](#further-work)
  * [Other Dependencies](#other-dependencies)
  * [Contributors & Acknowledgements](#contrib-acknow)
  * [Contribution Guidelines](#contrib-guidelines)
  * [License](#license)

# <ins>Use Guide</ins>

## <a name="#getting-started">Getting Started</a>
Start by downloading the repo
<!-- May have to add about the pyenv in the future for the version-->

Then, You will have to download the following model under the backend/models
directory for this to work.

To do this use one of the following commands in that directory:
* wget -O llama-2-7b-chat.Q4_K_M.gguf "https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF/resolve/main/llama-2-7b-chat.Q4_K_M.gguf"
* curl -L -o llama-2-7b-chat.Q4_K_M.gguf "https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF/resolve/main/llama-2-7b-chat.Q4_K_M.gguf"

Then, set up a venv, this is done by running the following commands in the backend directory
```
 $ python3 -m venv .venv
```
Then, get activate the virtual environment (to use the environment)
```
 $ source .venv/bin/activate
```
For further note, dont use at this point, only when you are done using the app, run the following
command to deactivate the venv
```
 $ deactivate
```

Once the .venv is created, run the following command in the backend directory to download all the
necessary libraries
```
 $ python3 -m install -r requirements.txt
```
Then after that you will have to run the following command in

At this point you have all the necessary requirements to use this app on your device.

## <a name="#start-up">How To Start Up</a>

To start off you will have to start the APIs for both the audio processing with OpenAI's Whisper and
for the use of the LocalLlama model.

To do this its made pretty simple, go into the backend directory and run the following commands: 
```
$ source .venv/bin/activate
```

(making use  of the provided scripts, will have to use similar commands for the others to work)
```
 $ chmod +x scripts/run_needed_apis.sh
 $ ./scripts/run_needed_apis.sh
```
Note: you only have to run the chmod command once on the file, it's to allow it to be ran as a script. Then for futher
use only use the script run command.

Once this is ran, both of the API's will be up and you can move further on. (how to close them will be
described later <a name ="#close-app">here</a>)

Now move into the frontend directory.

For the front end, I chose to use vite, so you will use the following command to use the frontend:

```
 $ npm run dev
```

Now everything is set up and you can use the app by following the link provided
(Make sure to use Google Chrome, one of the libraries only works with it)

## <a name="#use-app">How To Use The App</a>

First, I want you to look at the settings box, that allows the user to choose if they are in a noisy
environment or not, this decides whether Whisper or Speech Recognition API will be used.

Second, you can choose the practice language and the native language. For now only the practice
language is really used for the translating the input into english for the AI, but in the future
the native language will allow the user to add in the option to have all the stuff to show in their native language
as well.

Then you have your actual recording/use buttons. To record click the REC button until you are done
recording your voice and send it with the send button. If you want to reset your transcription, click the
reset button.

While recording, currently, depending on the environment chosen, it will show the final transcription as you record it.
However, it will always show you the concurrent transcription while recording. This is always accurate for the noisy
environment, but is not accurate for what the transcription will look like for Whisper.

When you send your transcription, the AI will respond back. The chat messages will show up in the chat
section in the lower part of the app. This conversation lasts the duration the app is up and can be scrolled
through with the provided buttons.

## <a name="#close-app">How to Close Down the App</a>

To close down the app start by closing the tab in your browser.

Then, go to where the vite development server is being ran and type in q then enter, this closes the development server.

Then, open a terminal that is NOT within the virtual environment, and use the following commands (8500 and 9000 are the 
ports initially used for this app, if you changed them, change them here as well):
```
 $ lsof -i :8500
 $ lsof -i :9000
```

Then look for the PID of the first that come up in the list for each and take note of them and run the following
commands:
```
 $ kill -2 {pid_one}
 $ kill -2 {pid_two}
```

Once you are done with this, both of the APIs are now closed.

Finally, in any terminals that you happen to have (.venv) in front of due to the activation of the venv within them,
use the following command
```
 $ deactivate 
```

## <a name="#aware-of">Things To Be Aware Of</a>

There is (will be) documentation on the generalities of all program files, so please check
those if you have any questions about the use of a file.

This app only works within the Google Chrome browser due to the use of the Speech Recognition API and its ability
to only be used in modern versions of the Google Chrome browser.

Sometimes when trying to close down the API, "$ kill -2 {pid}" wont work, so instead use one of the following (use them
in order because the last one is a more "harsh" kill command)
```
 $ kill -15 {pid}
```
OR (DON'T USE UNLESS YOU HAVE TO)
```
 $ kill -9 {pid}
```

At the current moment one API is set to port 8500 while the other is set to port 9000, both available
to anyone due to the use of "host='0.0.0.0'". Therefore, take those into consideration and make changes
as needed.

In the use of ProcessAudio.py, upon transcription it may state "FP16 is not supported on CPU; using FP32 instead". 
This warning is harmless, it just tells the user that it is using FP32 on the CPU rather than FP16 which would run
faster due to using a GPU. I could add a suppression for this warning by importing warnings and filter warning with 
ignore and then the message.

## <a name="#further-work">Ideas for Further Work</a>

See if you can find a better way to quit the APIs being ran in the background (overwrite signal to send on something?)

Make it so the input gets put through AI for the none Whisper to add grammar to it.

Until a good dataset for each conversational language can be used, the AI might be able to work better if you translate to english
with Whisper, then get conversation from AI in english, then
translate back to language chosen.

Could also add future part where it shows both the english and other languages
transcription and conversation. So like have a dropdown for native language, then
a button for the practice language. For now we will just be using english to get the
answer back from the AI.

Add a wait before the quiet recording, the audio blob needs time before recording i guess.

Implementing a light and dark mode and a more comprehensive UI that works in more displays.

Add the buttons to block off so they cant be used while recording is happening.

Add more testing.

## <a name="#other-dependencies">Other Dependencies</a>

Go to the docker website and download it for your system.

then run 
```
$ docker login
```

then run
```
 $ docker pull libretranslate/libretranslate
```

We need this due to using 
https://github.com/LibreTranslate/LibreTranslate

I'm sure there are dependencies used, but have not put down yet. I will go about checking it out another day and will
update this section accordingly. If anyone has any suggestions, please message me so I can update it.
<!-- I think I used penv, npm, and pip which people may have to download and set up so add later -->

## <a name="#contrib-acknow">Contributors & Acknowledgements</a>

This app was created by myself (BenWrightSWE).

## <a name="#contrib-guidelines">Contribution Guidelines</a>

Follow the license guideline and please message me regarding any changes you may have made. I'd love to hear about them
and implement them in this version after checking them out.

## <a name="#license">License</a>

For this project I am using the AGPL-3.0 license. Please respect this.

If you want further information regarding the license go to the LICENSE file.

<!--
### Notes for Git Usage:

To see git log with a good format: 
 $ git log --all --decorate --oneline --graph

### Notes for Docker usage:

docker ps -a : shows all containers
docker run -d -p 8500:5000 libretranslate/libretranslate
docker stop {id_of_container}
docker rm {id of container}
-->


