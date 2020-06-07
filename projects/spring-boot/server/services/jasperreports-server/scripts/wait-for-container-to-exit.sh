#!/usr/bin/env bash
# Use this script to test if a container has exited

CONTAINER=$1

RUNNING=$(docker inspect --format="{{.State.Running}}" $CONTAINER 2> /dev/null)

if [ "$RUNNING" == "true" ]; then
  echo "$CONTAINER is running."
  exit
fi
