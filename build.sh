#!/bin/bash

npm install
gulp scm-source
gulp
pierone login
docker build -t $1 . && docker push $1