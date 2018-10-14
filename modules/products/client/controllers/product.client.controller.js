(function () {
  'use strict';

  angular
    .module('products')
    .controller('ProductsController', ProductsController);

  ProductsController.$inject = ['$scope', '$state', '$window', 'productResolve', 'Notification', 'CategoriesService'];

  function ProductsController($scope, $state, $window, product, Notification, CategoriesService) {
    var vm = this;

    vm.categories = setCheckBoxItems();
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

    // Make a list of custom objects that we can bind checkbox values
    // and categories
    function setCheckBoxItems() {
      var allCategories = CategoriesService.query();
      var dbSelectedCategories = product.productCategories;

      var objectToBind = { isSelected: false, category: {} };
      // TODO:
      // foreach category, create an objectToBind.
      // set isSelected and category properties,
      // then return all in a list.
      return dbSelectedCategories;
    }

    function getSelectedCategories() {
      // TODO:
      // iterate list of objectsToBind
      // return only the categories, whose property
      // isSelected is true;
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
