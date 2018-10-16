'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  Product = mongoose.model('Product'),
  validator = require('validator');


/**
 * Create a product
 */
exports.create = function (req, res) {
  var product = new Product(req.body);

  product.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(product);
    }
  });
};

/**
 * Show the current product
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var product = req.product ? req.product.toJSON() : {};

  res.json(product);

};

/**
 * Update a product
 */
exports.update = function (req, res) {
  var product = req.product;

  product.productName = req.body.productName;
  product.productDescription = req.body.productDescription;
  product.productImgUrl = req.body.productImgUrl;
  product.productPrice = req.body.productPrice;
  product.qtyInStock = req.body.qtyInStock;
  product.productCategories = req.body.productCategories;

  product.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(product);
    }
  });
};

/**
 * Delete a product
 */
exports.delete = function (req, res) {
  var product = req.product;

  product.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(product);
    }
  });
};

/**
 * List of Products
 */
exports.list = function (req, res) {
  Product.find().exec(function (err, products) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(products);
    }
  });
};

/**
 * Product middleware
 */
exports.productByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Product is invalid'
    });
  }

  Product.findById(id).exec(function (err, product) {
    if (err) {
      return next(err);
    } else if (!product) {
      return res.status(404).send({
        message: 'No product with that identifier has been found'
      });
    }
    req.product = product;
    next();
  });
};

/**
 * Update product photo
 */
exports.changeProductPhoto = function (req, res) {
  // TODO
  // BUGFIX
  // product does not appear in req. Find out how to
  // get access to product.

  var product = req.product;
  var existingImageUrl;
  var multerConfig;

  multerConfig = { dest: '/uploads' };

  // Filtering to upload only images
  multerConfig.fileFilter = require(path.resolve('./config/lib/multer')).imageFileFilter;

  var upload = multer(multerConfig).single('newProductPhoto');

  if (product) {

    existingImageUrl = product.productImgUrl;

    uploadImage()
      .then(updateProduct)
      .then(deleteOldImage)
      .then(function () {
        res.json(product);
      })
      .catch(function (err) {
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'No product was passed'
    });
  }

  function uploadImage() {
    return new Promise(function (resolve, reject) {
      upload(req, res, function (uploadError) {
        if (uploadError) {
          reject(errorHandler.getErrorMessage(uploadError));
        } else {
          resolve();
        }
      });
    });
  }
  function updateProduct() {
    return new Promise(function (resolve, reject) {
      product.productImgUrl =
        '/' + req.file.path;
      product.save(function (err, theproduct) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  function deleteOldImage() {
    return new Promise(function (resolve, reject) {
      if (existingImageUrl !== Product.schema.path('productImgUrl').defaultValue) {
        fs.unlink(path.resolve('.' + existingImageUrl), function (unlinkError) {
          if (unlinkError) {

            // If file didn't exist, no need to reject promise
            if (unlinkError.code === 'ENOENT') {
              console.log('Removing product photo failed because file did not exist.');
              return resolve();
            }

            console.error(unlinkError);

            reject({
              message: 'Error occurred while deleting old product photo'
            });
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }
};
