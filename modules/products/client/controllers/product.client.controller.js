(function () {
  'use strict';

  angular
    .module('products')
    .controller('ProductsController', ProductsController);

  ProductsController.$inject = ['$scope', '$state', '$window', 'productResolve', 'Notification'];

  function ProductsController($scope, $state, $window, product, Notification) {
    var vm = this;

    vm.product = product;
    vm.form = {};
    vm.save = save;
    vm.remove = remove;

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
