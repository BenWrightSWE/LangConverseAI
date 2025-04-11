from flask import Flask, request, jsonify
from flask_cors import CORS
from process_audio.routes import pa_blueprint

# Sets up the flask app and sets up the routes/endpoints
def create_process_audio_api():
    pa_api = Flask(__name__)
    CORS(pa_api)
    pa_api.register_blueprint(pa_blueprint)
    return pa_api
