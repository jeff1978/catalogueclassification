(function () {
  'use strict';

  angular
    .module('products')
    .controller('ProductsListController', ProductsListController);

  ProductsListController.$inject = ['$scope', '$filter', 'ProductsService'];

  function ProductsListController($scope, $filter, ProductsService) {
    var vm = this;

    ProductsService.query(function (data) {
      vm.products = data;
    });

    // Filter logic for pipe, not ideal - should filter vm.products for best practice.
    // TODO:
    // Implement filtering not using pipe.
    vm.searchFilter = function (row) {
      return !!((row._id.indexOf(vm.search || '') !== -1 || row.productName.indexOf(vm.search || '') !== -1));
    };
  }
}());
