import llama_cpp as llama
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model_path = './models/llama-2-7b-chat.Q4_K_M.gguf'
model = llama.Llama(model_path=model_path)

@app.route('/api/llamaResponse', methods=['POST'])
def llamaResponse():
    sentData = request.get_json()
    userResponse = sentData["message"].strip()
    print(userResponse)

    if userResponse == '':
        return jsonify({"error": "Empty response"}), 400

    output = model(f"Respond: {userResponse}", max_tokens=100)
    return jsonify({"modelResponse": output["choices"][0]["text"]})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=9000)
