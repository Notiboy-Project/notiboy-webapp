#!/bin/bash

RELEASE=dev
PORT=11996
#sed -i "s#axios.defaults.baseURL =.*#axios.defaults.baseURL = 'https://securecerts.in/staging/v1/main'#g" src/main.js

# build image
make run RELEASE=$RELEASE
if [[ $? -ne 0 ]]; then
	echo -e "Build failed\n"
	exit 1
fi

sudo docker rm -f notiboy
sudo docker run --rm --name notiboy -p $PORT:$PORT localhost:32000/notiboy:$RELEASE
