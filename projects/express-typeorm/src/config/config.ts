import path from 'path';

import convict from 'convict';

export const config = convict({

  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },

  isDebugMode: {
    format: 'Boolean',
    default: true
  },

  protocol: {
    doc: 'The protocol to use.',
    format: ['http', 'https'],
    default: 'http',
    env: 'PROTOCOL'
  },

  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS',
  },

  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8080,
    env: 'PORT',
    arg: 'port'
  }

});

// Load environment dependent configuration
const env = config.get('env');
config.loadFile(path.join(__dirname, env + '.json'));

// Perform validation
config.validate({ allowed: 'strict' });

// https://medium.com/datreeio/node-js-docker-workflow-b9d936c931e1
// https://github.com/mozilla/node-convict

// https://codingsans.com/blog/configure-frontend-projects-with-dotenv

// https://stackoverflow.com/questions/35581631/host-independent-url-from-code
