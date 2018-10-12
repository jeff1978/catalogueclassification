'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  path = require('path'),
  config = require(path.resolve('./config/config')),
  Schema = mongoose.Schema,
  validator = require('validator');


/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function (property) {
  return (property > 0);
};

var ProductSchema = new Schema({
  productName: {
    type: String,
    trim: true,
    required: 'Product name cannot be blank' },
  productDescription: {
    type: String,
    trim: true,
    required: 'Product description cannot be blank' },
  productImgUrl: {
    type: String,
    default: '/modules/products/client/img/products/default.png' },
  productPrice: {
    type: Number,
    trim: true,
    required: 'Please enter a whole number price :-)',
    validate: [validateLocalStrategyProperty, 'Price cannot be less than 0'] },
  qtyInStock: {
    type: Number,
    trim: true,
    required: 'Please enter a quantity.',
    validate: [validateLocalStrategyProperty, 'Quantity cannot be less than 0'] },
  productCategories: { type:
    [{ type: Schema.ObjectId,
      ref: 'Category' }] } });

ProductSchema.statics.seed = seed;

mongoose.model('Product', ProductSchema);

/**
* Seeds the Product collection with document (Product)
*/
function seed(doc, options) {
  var Product = mongoose.model('Product');

  return new Promise(function (resolve, reject) {

    skipDocument()
      .then(add)
      .then(function (response) {
        return resolve(response);
      })
      .catch(function (err) {
        return reject(err);
      });

    function skipDocument() {
      return new Promise(function (resolve, reject) {
        Product
          .findOne({
            productName: doc.productName
          })
          .exec(function (err, existing) {
            if (err) {
              return reject(err);
            }

            if (!existing) {
              return resolve(false);
            }

            if (existing && !options.overwrite) {
              return resolve(true);
            }

            // Remove Product (overwrite)
            existing.remove(function (err) {
              if (err) {
                return reject(err);
              }

              return resolve(false);
            });
          });
      });
    }

    function add(skip) {
      return new Promise(function (resolve, reject) {

        if (skip) {
          return resolve({
            message: ('Database Seeding: Product\t\t' + doc.productName + ' skipped')
          });
        }
        var product = new Product(doc);

        product.save(function (err) {
          if (err) {
            return reject(err);
          }

          return resolve({
            message: 'Database Seeding: product\t' + product.productName + ' added'
          });
        });
      });

    }
  });
}
