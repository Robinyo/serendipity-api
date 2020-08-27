# FROM jboss/keycloak:10.0.1
FROM jboss/keycloak:11.0.1

ENV THEME_VERSION 1.0

USER root

RUN microdnf install -y unzip

COPY json /tmp

# COPY ./standalone-ha.xml /opt/jboss/keycloak/standalone/configuration/standalone-ha.xml

COPY ./serendipity-keycloak-theme-$THEME_VERSION.zip /opt/jboss/keycloak/themes
RUN cd /opt/jboss/keycloak/themes && \
    unzip serendipity-keycloak-theme-$THEME_VERSION.zip && \
    rm serendipity-keycloak-theme-$THEME_VERSION.zip
