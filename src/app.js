const middleware = require('./middleware');
const routes = require('./routes');
const { log } = require('./utils/logger');

function setupResources(app) {
  log.info('loading resources');
  middleware.registerMiddleware(app);
  routes.initialize(app);
  middleware.registerErrorHandlers(app);
}

async function startServer(app) {
  setupResources(app);

  const PORT = process.env.PORT || 8080;
  app.listen(PORT);
  log.info(`server started on ${PORT}`);
}

module.exports = {
  startServer,
};
