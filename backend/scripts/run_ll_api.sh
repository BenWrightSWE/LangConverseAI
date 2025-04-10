#!/bin/bash
#use chmod +x "scripts/run_ll_api.sh" to make executable
export PYTHONPATH=$(pwd)/src

python3 -m local_llama.run
