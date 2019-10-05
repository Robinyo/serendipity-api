# I prefer to name a specific version, rather than one of the ‘floating’ tags like node:lts or node:latest
FROM node:12.8.1

# The only commands we need to run as root
RUN mkdir /srv/serendipity-api && chown node:node /srv/serendipity-api

# An unprivileged user that comes built into all of the official node images from Docker
USER node

# See: https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html
WORKDIR /srv/serendipity-api

# Install the App's dependencies
COPY --chown=node:node package*.json ./
RUN npm install --quiet

# Bundle the App's source
COPY --chown=node:node . .
