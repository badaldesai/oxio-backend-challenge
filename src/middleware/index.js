const express = require('express');
const cors = require('cors');

const { log } = require('../utils/logger');

/**
 * This module contains express middleware.
 * Middleware authenicate any request comes to API.
 * Error Handlers middleware will intercept responses and send proper error codes to the client.
 */
module.exports = {

  registerErrorHandlers: (app) => {
    // eslint-disable-next-line no-unused-vars
    app.use((req, res, next) => {
      log.warn('404: %s %s', req.method, req.url);
      return res.status(404).json({ error: 'resource not found' });
    });

    // unhandled exceptions
    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
      const status = err.status || 500;
      const message = err.message || 'Something went wrong';
      const stack = (err.stack || '').split('\n');

      log.error(
        `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}, Stack:: ${stack}`,
      );
      return res.status(status).json(message);
    });
  },

  registerMiddleware: (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());

    // request logging
    app.use((req, res, next) => {
      log.trace('%s %s', req.method, req.url);
      return next();
    });
  },
};
