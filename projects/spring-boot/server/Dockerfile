# FROM openjdk:11.0.7-slim -> libfreetype.so.6: cannot open shared object file: No such file or directory
FROM openjdk:11.0.7

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
