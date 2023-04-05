const express = require('express');
const { startServer } = require('./src/app');

startServer(express())
  .catch((err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err.stack);

      process.exit(1);
    }
  });
