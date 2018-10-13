(function () {
  'use strict';

  angular
    .module('categories')
    .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['$scope', '$state', '$window', 'categoryResolve', 'Notification'];

  function CategoriesController($scope, $state, $window, category, Notification) {
    var vm = this;

    vm.category = category;
    vm.form = {};
    vm.save = save;
    vm.remove = remove;

    // Remove existing Category
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.category.$remove(function () {
          $state.go('categories.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Category deleted successfully!' });
        });
      }
    }

    // Save Category
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.categoryForm');
        return false;
      }

      // Create a new category, or update the current instance
      vm.category.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('categories.list'); // should we send the User to the list or the updated Category's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Category saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Category save error!' });
      }
    }
  }
}());
