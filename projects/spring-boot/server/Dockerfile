# I prefer to name a specific version, rather than one of the ‘floating’ tags
# FROM adoptopenjdk/openjdk11:jre-11.0.6_10
FROM adoptopenjdk:11-jre-hotspot
# FROM adoptopenjdk/openjdk11:ubi

# Commands that we need to run as root
RUN addgroup --system spring && adduser --system spring --ingroup spring
RUN mkdir /opt/serendipity-api && chown spring:spring /opt/serendipity-api

USER spring:spring

# Install the App's dependencies
COPY ./target/serendipity-rest-api-core-0.0.1-SNAPSHOT.jar /opt/serendipity-api

CMD ["java", "-jar", "/opt/serendipity-api/serendipity-rest-api-core-0.0.1-SNAPSHOT.jar"]

EXPOSE 3001
