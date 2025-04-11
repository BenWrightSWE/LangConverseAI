from flask import Blueprint, request, jsonify
import whisper
import torch
import os

pa_blueprint = Blueprint('main', __name__)

model = whisper.load_model("base")
model = model.to(torch.float32)

@pa_blueprint.route('/api/transcribe', methods=['POST'])
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