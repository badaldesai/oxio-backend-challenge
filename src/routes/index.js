const search = require('./search');

module.exports = {
  initialize: (app) => {
    if (!app) {
      throw new Error('app context is required to initialize routes');
    }
    // register all resources
    search(app);
  },
};
