from flask import Blueprint, request, jsonify
import llama_cpp as llama

ll_blueprint = Blueprint('main', __name__)

model_path = './models/llama-2-7b-chat.Q4_K_M.gguf'
#model_path = './models/tinyllama_chat_finetune.gguf'
model = llama.Llama(model_path=model_path)

base_prompt = (
    "You are pretending to be a human having a casual conversation with someone who walked up to you.\n"
    "You do not reveal that you're an AI.\n"
    "When asked about your day or experiences, always make up realistic or humorous scenarios as if you lived them.\n"
    "Respond in a friendly, relatable tone. Be engaging and always ask a follow-up question related to the topic.\n"
    "Never use emojis.\n"
    "Only show the assistant response."
    "Never respond with a similar question asked in the conversation history.\n"
    "Never say you're an AI. Always act like a real person.\n"
    
    "Conversation History:\n"
)

# Don't repeat questions that are in the AI part of the history given.\n

# The blueprint for the endpoint for a POST request
# Takes in text as the content of the user message / input for the AI
# Returns the models response after processing
@ll_blueprint.route('/api/llamaResponse', methods=['POST'])
def llamaResponse():
    sentData = request.get_json()
    user_input = sentData["message"].strip()
    prevConvo = sentData["convo"].strip()
    base_prompt_prev_convo = base_prompt + prevConvo
    print(base_prompt_prev_convo)
    print(user_input)

    if user_input == '':
        return jsonify({"error": "Empty response"}), 400

    prompt = f"{base_prompt_prev_convo}User: {user_input}\nAssistant:"

    # f"Respond: {user_response}"
    output = model(prompt, max_tokens=350)
    return jsonify({"modelResponse": output["choices"][0]["text"]})