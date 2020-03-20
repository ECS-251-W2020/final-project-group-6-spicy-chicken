#!/usr/bin/env bash

# run 100 consecutive clients. 100 samples
seq 100| parallel -j 1 ./gclient.py

# run 5 parallel clients. 100 samples.
#seq 500| parallel -j 5 ./gclient.py

# run 10 parallel clients. 100 samples.
#seq 1000| parallel -j 10 ./gclient.py


