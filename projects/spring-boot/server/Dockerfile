FROM openjdk:11.0.7-slim

COPY /services/jasperreports-server/scripts/wait-for-container-to-exit.sh /
COPY entrypoint.sh /

# Commands that we need to run as root
RUN echo "apt-get" && \
    chmod +x /*.sh && \
    apt-get update && \
    apt-get install -y --no-install-recommends curl jq && \
    addgroup --system spring && adduser --system spring --ingroup spring && \
    mkdir /opt/serendipity-api && chown spring:spring /opt/serendipity-api

USER spring:spring

COPY ./target/serendipity-rest-api-core-0.0.1-SNAPSHOT.jar /opt/serendipity-api

EXPOSE 3001

ENTRYPOINT ["/entrypoint.sh"]

CMD ["java", "-jar", "/opt/serendipity-api/serendipity-rest-api-core-0.0.1-SNAPSHOT.jar"]





# FROM adoptopenjdk/openjdk11:jre-11.0.6_10
# FROM adoptopenjdk/openjdk11:ubi
# FROM adoptopenjdk:11-jre-hotspot

# https://stackoverflow.com/questions/53669151/java-11-application-as-lightweight-docker-image
# https://forums.docker.com/t/openjdk-bin-sh-apt-command-not-found/72606

# yum -y update && \
# yum -y install yum-utils curl jq && \

# apt-get update && \
# apt-get install -y --no-install-recommends curl jq && \

# apk add --no-cache curl jq && \
