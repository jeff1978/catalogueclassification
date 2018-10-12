'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  Product = mongoose.model('Product'),
  Category = mongoose.model('Category');


  /**
 * Globals
 */
var category,
  product;

/**
 * Unit tests
 */
describe('Product Model Unit Tests:', function () {

  beforeEach(function (done) {
    category = new Category({
      categoryName: 'Antiques'
    });

    category.save()
      .then(function () {
        product = new Product({
          productName: 'Old chair',
          productDescription: 'Made of wood.',
          productImgUrl: 'some/test/url',
          productPrice: 34,
          qtyInStock: 3,
          productCategories: [category._id]
        });

        done();
      })
      .catch(done);
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(10000);
      product.save(function (err) {
        should.not.exist(err);
        return done();
      });
    });

    it('should be able to show an error when try to save without productName', function (done) {
      product.productName = '';

      product.save(function (err) {
        should.exist(err);
        return done();
      });
    });
  });

  // TODO:
  // more tests needed for field validation

  afterEach(function (done) {
    Product.remove().exec()
      .then(Category.remove().exec())
      .then(done())
      .catch(done);
  });
});
