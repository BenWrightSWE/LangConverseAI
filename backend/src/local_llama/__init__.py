from flask import Flask, request, jsonify
from flask_cors import CORS
from local_llama.routes import ll_blueprint

# Sets up the flask app and sets up the routes/endpoints
def create_local_llama_api():
    ll_api = Flask(__name__)
    CORS(ll_api)
    ll_api.register_blueprint(ll_blueprint)
    return ll_api
