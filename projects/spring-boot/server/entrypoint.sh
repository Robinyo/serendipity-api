#!/bin/bash

set -e

run() {
  exec java -jar /opt/serendipity-api/serendipity-rest-api-core-0.0.1-SNAPSHOT.jar
}

run

#  exec env JAVA_OPTS="$JAVA_OPTS" catalina.sh run
