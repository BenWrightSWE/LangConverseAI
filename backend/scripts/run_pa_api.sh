#!/bin/bash
# use chmod +x "scripts/run_pa_api.sh" to make executable
# to run, in the directory backend, run: $ scripts/run_pa_api.sh
# use CTRL + C to end the API

export PYTHONPATH=$(pwd)/src

python3 -m process_audio.run