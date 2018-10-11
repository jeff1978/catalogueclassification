'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  path = require('path'),
  config = require(path.resolve('./config/config')),
  Schema = mongoose.Schema;

var CategorySchema = new Schema({
  categoryName: {
    type: String,
    trim: true,
    unique: true,
    required: 'Category name cannot be blank.' } });

CategorySchema.statics.seed = seed;

mongoose.model('Category', CategorySchema);

/**
* Seeds the Category collection with document (Category)
*/
function seed(doc, options) {
  var Category = mongoose.model('Category');

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
        Category
          .findOne({
            categoryName: doc.categoryName
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

            // Remove Category (overwrite)
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
            message: ('Database Seeding: Category\t\t' + doc.categoryName + ' skipped')
          });
        }
        var category = new Category(doc);

        category.save(function (err) {
          if (err) {
            return reject(err);
          }

          return resolve({
            message: 'Database Seeding: category\t' + category.categoryName + ' added'
          });
        });
      });

    }
  });
}
