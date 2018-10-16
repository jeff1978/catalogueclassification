(function () {
  'use strict';

  angular
    .module('products.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('products', {
        abstract: true,
        url: '/products',
        template: '<ui-view/>'
      })
      .state('products.list', {
        url: '',
        templateUrl: '/modules/products/client/views/list-products.client.view.html',
        controller: 'ProductsListController',
        controllerAs: 'vm'
      })
      .state('products.create', {
        url: '/create',
        templateUrl: '/modules/products/client/views/form-product.client.view.html',
        controller: 'ProductsController',
        controllerAs: 'vm',
        resolve: {
          productResolve: newProduct
        }
      })
      .state('products.photo', {
        url: '/:productId/photo',
        templateUrl: '/modules/products/client/views/form-photo.client.view.html',
        controller: 'PhotosController',
        controllerAs: 'vm',
        data: {
          pageTitle: '{{ productResolve.productName }}'
        },
        resolve: {
          productResolve: getProduct
        }
      })
      .state('products.edit', {
        url: '/:productId/edit',
        templateUrl: '/modules/products/client/views/form-product.client.view.html',
        controller: 'ProductsController',
        controllerAs: 'vm',
        data: {
          pageTitle: '{{ productResolve.productName }}'
        },
        resolve: {
          productResolve: getProduct
        }
      });
  }


  function getProduct($stateParams, ProductsService) {
    return ProductsService.get({
      productId: $stateParams.productId
    }).$promise;
  }

  newProduct.$inject = ['ProductsService'];

  function newProduct(ProductsService) {
    return new ProductsService();
  }
}());
