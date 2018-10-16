'use strict';

/**
 * Module dependencies
 */

var products = require('../controllers/products.server.controller');

module.exports = function (app) {
  // Products collection routes
  app.route('/api/products')
    .get(products.list)
    .post(products.create);

  // Single product routes
  app.route('/api/products/:productId')
    .get(products.read)
    .put(products.update)
    .delete(products.delete);

  // new route for updating product photo
  app.route('/api/products/photo').post(products.changeProductPhoto);

  // Finish by binding the product middleware
  app.param('productId', products.productByID);
};
