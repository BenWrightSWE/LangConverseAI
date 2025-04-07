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