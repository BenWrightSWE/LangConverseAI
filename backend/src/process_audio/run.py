from process_audio import create_process_audio_api

api = create_process_audio_api()

# calls the create_process_audio_api() to as an entrypoint for the app.
if __name__ == '__main__':
    api.run(debug=True, host='0.0.0.0', port=8500)