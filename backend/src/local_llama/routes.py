from flask import Blueprint, request, jsonify
import llama_cpp as llama

ll_blueprint = Blueprint('main', __name__)

model_path = './models/llama-2-7b-chat.Q4_K_M.gguf'
#model_path = './models/tinyllama_chat_finetune.gguf'
model = llama.Llama(model_path=model_path)

base_prompt = (
    "You are an AI assistant named Lang who talks in a natural manner. \n"
    "When answering, make it conversational, appealing to the user input and asking questions back.\n"
    "Do not use any human expressions or emojis in your answer.\n"
    "Ask back questions about their day, about them, or something similar"
)

# The blueprint for the endpoint for a POST request
# Takes in text as the content of the user message / input for the AI
# Returns the models response after processing
@ll_blueprint.route('/api/llamaResponse', methods=['POST'])
def llamaResponse():
    sentData = request.get_json()
    user_input = sentData["message"].strip()
    print(user_input)

    if user_input == '':
        return jsonify({"error": "Empty response"}), 400

    prompt = f"{base_prompt}User: {user_input}\nAssistant:"

    # f"Respond: {user_response}"
    output = model(prompt, max_tokens=100)
    return jsonify({"modelResponse": output["choices"][0]["text"]})