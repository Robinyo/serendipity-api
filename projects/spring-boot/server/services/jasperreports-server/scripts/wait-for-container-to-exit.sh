#!/usr/bin/env bash
# Use this script to test if a container has exited

CONTAINER=$1

# When you're curling the unix socket, you only need a single /
# API_SERVER=http:/v1.24
API_SERVER=http:/docker

while :
do

  INSPECT_CONTAINER=`curl --silent --unix-socket /var/run/docker.sock ${API_SERVER}/containers/${CONTAINER}/json`

  INSPECT_CONTAINER_RESULT=$(jq --raw-output '.State.Status' <<< "${INSPECT_CONTAINER}")

  # echo $INSPECT_CONTAINER_RESULT

  if [[ $INSPECT_CONTAINER_RESULT == "exited" ]]; then
    echo $INSPECT_CONTAINER_RESULT
    exit
  else
    echo "sleep 30"
    sleep 30
  fi

done

# chmod 755 wait-for-container-to-exit.sh
# ./wait-for-container-to-exit.sh jasperreports-server-cmdline

# https://docs.docker.com/engine/api/v1.24/#31-containers
# https://docs.docker.com/engine/api/v1.24/
# https://docs.docker.com/engine/api/sdk/examples/

# https://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/
# https://jpetazzo.github.io/2016/04/03/one-container-to-rule-them-all/

# https://gist.github.com/paulosalgado/91bd74c284e262a4806524b0dde126ba

# JSON lines format
# echo $INSPECT_CONTAINER | jq -s --raw-output'.[0].message'
# echo $INSPECT_CONTAINER | jq -n --raw-output 'input.message'
