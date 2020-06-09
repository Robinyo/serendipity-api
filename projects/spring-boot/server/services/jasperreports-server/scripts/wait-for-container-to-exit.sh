#!/usr/bin/env bash
# Use this script to test if a container has exited

WAITFORIT_cmdname=${0##*/}

echoerr() { if [[ $WAITFORIT_QUIET -ne 1 ]]; then echo "$@" 1>&2; fi }

usage()
{
    cat << USAGE >&2
Usage:
    $WAITFORIT_cmdname container [-s] [-t timeout] [-- command args]
    container                   The name of the container to wait for :)
    -q | --quiet                Don't output any status messages
    -t TIMEOUT | --timeout=TIMEOUT
                                Timeout in seconds
    -- COMMAND ARGS             Execute command with args after the test finishes
USAGE
    exit 1
}

wait_for()
{
  while :
  do

    INSPECT_CONTAINER=`curl --silent --unix-socket /var/run/docker.sock ${API_SERVER}/containers/${WAITFORIT_CONTAINER}/json`

    INSPECT_CONTAINER_RESULT=$(jq --raw-output '.State.Status' <<< "${INSPECT_CONTAINER}")

    # echoerr $INSPECT_CONTAINER_RESULT

    if [[ $INSPECT_CONTAINER_RESULT == "exited" ]]; then
      exec "${WAITFORIT_CLI[@]}"
      exit
    else
      sleep $WAITFORIT_TIMEOUT
    fi

  done
}

while [[ $# -gt 0 ]]
do
  case "$1" in
    -q | --quiet)
    WAITFORIT_QUIET=1
    shift 1
    ;;
    -t)
    WAITFORIT_TIMEOUT="$2"
    if [[ $WAITFORIT_TIMEOUT == "" ]]; then break; fi
    shift 2
    ;;
    --timeout=*)
    WAITFORIT_TIMEOUT="${1#*=}"
    shift 1
    ;;
    --)
    shift
    WAITFORIT_CLI=("$@")
    break
    ;;
    --help)
    usage
    ;;
    *)
    WAITFORIT_CONTAINER="$1"
    shift 1
    ;;
  esac
done

WAITFORIT_QUIET=${WAITFORIT_QUIET:-0}
WAITFORIT_STRICT=${WAITFORIT_STRICT:-0}
WAITFORIT_TIMEOUT=${WAITFORIT_TIMEOUT:-15}

# When you're curling the unix socket, you only need a single /
# API_SERVER=http:/v1.24
API_SERVER=http:/docker

wait_for

# chmod 755 wait-for-container-to-exit.sh
# ./wait-for-container-to-exit.sh jasperreports-server-cmdline -t 30 -- ./entrypoint-ce.sh run
# command: ["./wait-for-container-to-exit.sh", "jasperreports-server-cmdline", "-t" , "30", "--", "./entrypoint-ce.sh", "run"]

# https://docs.docker.com/engine/api/v1.24/#31-containers
# https://docs.docker.com/engine/api/v1.24/
# https://docs.docker.com/engine/api/sdk/examples/

# https://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/
# https://jpetazzo.github.io/2016/04/03/one-container-to-rule-them-all/

