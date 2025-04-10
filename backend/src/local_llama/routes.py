from flask import Blueprint, request, jsonify
import llama_cpp as llama

ll_blueprint = Blueprint('main', __name__)

model_path = './models/llama-2-7b-chat.Q4_K_M.gguf'
model = llama.Llama(model_path=model_path)

@ll_blueprint.route('/api/llamaResponse', methods=['POST'])
def llamaResponse():
    sentData = request.get_json()
    userResponse = sentData["message"].strip()
    print(userResponse)

    if userResponse == '':
        return jsonify({"error": "Empty response"}), 400

    output = model(f"Respond: {userResponse}", max_tokens=100)
    return jsonify({"modelResponse": output["choices"][0]["text"]})