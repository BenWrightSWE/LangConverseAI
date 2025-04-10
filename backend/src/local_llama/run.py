from local_llama import create_local_llama_api

api = create_local_llama_api()

if __name__ == '__main__':
    api.run(debug=True, host='0.0.0.0', port=9000)