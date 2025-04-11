
# OLD CODE FOR THE FLASK APP, NOT USED ANYMORE, JUST FOR REFERENCE

from flask import Flask, request, jsonify
from flask_cors import CORS
import whisper
import torch
import os

app = Flask(__name__)
CORS(app)

model = whisper.load_model("base")
model = model.to(torch.float32)

@app.route('/api/transcribe', methods=['POST'])


# Takes in the .wav file from the request and turns, uses whisper to get a transcription and then returns the transcription.

def transcribe():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    print(f"recieved file: {file.filename}")

    if file.filename == '':
        print("no name file")
        return jsonify({"error": "No selected file"}), 400


    file_path = "../temp_audio.wav"
    file.save(file_path)
    file_size = os.path.getsize(file_path)
    print(f"file saved at {file_path}, size: {file_size} bytes")

    if file_size == 0:
        return jsonify({"error": "Uploaded file is empty"}), 400

    result = model.transcribe(file_path, language="en") # es
    transription = result['text']

    return jsonify({"transcription": transription})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8500)
