(function () {
  'use strict';

  angular
    .module('products')
    .controller('PhotosController', PhotosController);

  PhotosController.$inject = ['$scope', '$state', 'productResolve', 'Notification', 'Upload', '$timeout'];

  function PhotosController($scope, $state, product, Notification, Upload, $timeout) {


    var vm = this;

    vm.product = product;
    vm.progress = 0;

    vm.upload = function (dataUrl) {

      Upload.upload({
        url: '/api/products/photo/' + vm.product._id,
        data: {
          newProductPhoto: dataUrl
        }
      }).then(function (response) {
        $timeout(function () {
          onSuccessItem(response.data);
        });
      }, function (response) {
        if (response.status > 0) onErrorItem(response.data);
      }, function (evt) {
        vm.progress = parseInt(100.0 * evt.loaded / evt.total, 10);
      });
    };

    // Called after the user has successfully uploaded a new picture
    function onSuccessItem(response) {

      $state.go('products.list'); // send the user to the list page.

      // Show success message
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Successfully changed product photo' });

    }

    // Called after the user has failed to upload a new picture
    function onErrorItem(response) {
      vm.fileSelected = false;
      vm.progress = 0;

      // Show error message
      Notification.error({ message: response.message, title: '<i class="glyphicon glyphicon-remove"></i> Failed to change product photo' });
    }
  }
}());
