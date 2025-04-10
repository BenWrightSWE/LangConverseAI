from process_audio import create_process_audio_api

api = create_process_audio_api()

if __name__ == '__main__':
    print("here")
    api.run(debug=True, host='0.0.0.0', port=8500)