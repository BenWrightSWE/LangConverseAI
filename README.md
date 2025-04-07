# Lang Converse AI
An application that uses AI to practice your language speaking.

Notes for use:

You will have to download the following model under the backend/models
directory for this to work.

To do this use on of the following commands in that directory:
* wget -O llama-2-7b-chat.Q4_K_M.gguf "https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF/resolve/main/llama-2-7b-chat.Q4_K_M.gguf"
* curl -L -o llama-2-7b-chat.Q4_K_M.gguf "https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF/resolve/main/llama-2-7b-chat.Q4_K_M.gguf"

Notes for further work:

Until a good dataset for conversational language can be used, 
the AI might be able to work better if you translate to english
with Whisper, then get conversation from AI in english, then
translate back with Whisper.

Could also add future part where it shows both the english and other languages
transcription and conversation. So like have a dropdown for native language, then
a button for the practice language. For now we will just be using english to get the
answer back from the AI.

Add a wait before the quiet recording, the audio blob needs time before recording i guess.

To see git log with a good format:
git log --all --decorate --oneline --graph


