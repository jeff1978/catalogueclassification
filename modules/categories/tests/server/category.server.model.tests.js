'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  Category = mongoose.model('Category');

/**
 * Globals
 */
var category;

/**
 * Unit tests
 */
describe('Category Model Unit Tests:', function () {

  beforeEach(function (done) {
    category = new Category({
      categoryName: 'Jeffs test category'
    });

    category.save()
      .then(function () {
        done();
      })
      .catch(done);
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(10000);
      category.save(function (err) {
        should.not.exist(err);
        return done();
      });
    });

    it('should be able to show an error when try to save without categoryName', function (done) {
      category.categoryName = '';

      category.save(function (err) {
        should.exist(err);
        return done();
      });
    });
  });

  afterEach(function (done) {
    Category.remove().exec()
      .then(done())
      .catch(done);
  });
});
