const express = require('express');

const { search } = require('../modules/search');
const HttpException = require('../utils/exceptions');

module.exports = function (app) {
  const router = express.Router();

  app.use('/v1', router);

  router.get('/phone-numbers', async (req, res, next) => {
    try {
      const { query } = req;
      if (!query?.phoneNumber) {
        throw new HttpException(400, { error: 'phoneNumber is required query parameter' });
      }
      const response = await search(query.phoneNumber);
      return res.status(200).send(response);
    } catch (err) {
      return next(err);
    }
  });
};
