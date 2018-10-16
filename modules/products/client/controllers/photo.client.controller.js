(function () {
  'use strict';

  angular
    .module('products')
    .controller('PhotosController', PhotosController);

  PhotosController.$inject = ['$scope', '$state', '$window', 'productResolve', 'Notification', 'CategoriesService'];

  function PhotosController($scope, $state, $window, product, Notification, CategoriesService) {
    var vm = this;


  }
}());
