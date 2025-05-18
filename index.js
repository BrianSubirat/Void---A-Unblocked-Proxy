const express = require('express');
const { createBareServer } = require('@tomphttp/bare-server-node');
const { uvPath } = require('@titaniumnetwork-dev/ultraviolet');
const { createLibriculServer } = require('@tomphttp/libricul');
const path = require('path');

const app = express();
const bareServer = createBareServer('/bare/');
const libriculServer = createLibriculServer('/libricul/');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uv/', express.static(uvPath));

// Handle bare and libricul server requests
app.use((req, res, next) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else if (libriculServer.shouldRoute(req)) {
    libriculServer.routeRequest(req, res);
  } else {
    next();
  }
});

// Start server
const server = app.listen(8080, () => {
  console.log('Server running on port 8080');
});

server.on('upgrade', (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else if (libriculServer.shouldRoute(req)) {
    libriculServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

