#!/bin/bash
# use chmod +x "scripts/run_needed_apis.sh" to make executable
# to run, in the directory backend, run: $ scripts/run_needed_apis.sh
# to stop, find the pids with lsof -i :8500 and lsof -i :9000 and run:
# $ kill -SIGINT {pidOne} {pidTwo}
# run the kill outside of the .venv

export PYTHONPATH=$(pwd)/src

python3 -m local_llama.run &
python3 -m process_audio.run &