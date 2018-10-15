(function () {
  'use strict';

  angular
    .module('products')
    .controller('ProductsController', ProductsController);

  ProductsController.$inject = ['$scope', '$state', '$window', 'productResolve', 'Notification', 'CategoriesService'];

  function ProductsController($scope, $state, $window, product, Notification, CategoriesService) {
    var vm = this;

    vm.allCategories = CategoriesService.query();
    vm.product = product;
    vm.form = {};
    vm.save = save;
    vm.remove = remove;

    // if product is new then set a new array for categories
    if (!vm.product.productCategories) {
      vm.product.productCategories = [];
    }

    // if product is new then set a default image placeholder
    if (!vm.product.productImgUrl) {
      vm.product.productImgUrl = '/modules/products/client/img/products/default.png';
    }

    // Toggle selection for a given category by id
    vm.toggleSelection = function toggleSelection(categoryId) {
      var idx = vm.product.productCategories.indexOf(categoryId);

      // Is currently selected
      if (idx > -1) {
        vm.product.productCategories.splice(idx, 1);
        // Is newly selected
      } else {
        vm.product.productCategories.push(categoryId);
      }
    };

    // Remove existing Product
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.product.$remove(function () {
          $state.go('products.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Product deleted successfully!' });
        });
      }
    }

    // Save Product
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.productForm');
        return false;
      }

      // Create a new product, or update the current instance
      vm.product.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('products.list'); // should we send the User to the list or the updated Product's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Product saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Product save error!' });
      }
    }
  }
}());
