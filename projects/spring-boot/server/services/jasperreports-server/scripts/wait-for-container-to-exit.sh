#!/usr/bin/env bash
# Use this script to test if a container has exited

CONTAINER=$1

API_SERVER=http:/v1.24
CONTENT_TYPE="Content-Type: application/json"

INSPECT_CONTAINER=`curl --silent --unix-socket /var/run/docker.sock -H ${CONTENT_TYPE} ${API_SERVER}/containers/${CONTAINER}/json`

INSPECT_CONTAINER_RESULT=$(jq -s --raw-output '.[0].message' <<< "${INSPECT_CONTAINER}")

echo INSPECT_CONTAINER_RESULT

if [[ "${INSPECT_CONTAINER_RESULT}" == "page not found" ]]; then
  echo "${CONTAINER} not found"
else
  echo "${CONTAINER} found"
fi

# https://docs.docker.com/engine/api/v1.24/#31-containers
# https://docs.docker.com/engine/api/v1.24/
# https://docs.docker.com/engine/api/sdk/examples/

# https://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/
# https://jpetazzo.github.io/2016/04/03/one-container-to-rule-them-all/

# https://gist.github.com/paulosalgado/91bd74c284e262a4806524b0dde126ba

# chmod 755 wait-for-container-to-exit.sh
# ./wait-for-container-to-exit.sh jasperreports-server-cmdline

# JSON lines format
# echo $INSPECT_CONTAINER | jq -s --raw-output'.[0].message'
# echo $INSPECT_CONTAINER | jq -n --raw-output 'input.message'
