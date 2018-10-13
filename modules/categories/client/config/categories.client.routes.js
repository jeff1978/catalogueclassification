(function () {
  'use strict';

  angular
    .module('categories.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('categories', {
        abstract: true,
        url: '/categories',
        template: '<ui-view/>'
      })
      .state('categories.list', {
        url: '',
        templateUrl: '/modules/categories/client/views/list-categories.client.view.html',
        controller: 'CategoriesListController',
        controllerAs: 'vm'
      })
      .state('categories.create', {
        url: '/create',
        templateUrl: '/modules/categories/client/views/form-category.client.view.html',
        controller: 'CategoriesController',
        controllerAs: 'vm',
        resolve: {
          categoryResolve: newCategory
        }
      })
      .state('categories.edit', {
        url: '/:categoryId/edit',
        templateUrl: '/modules/categories/client/views/form-category.client.view.html',
        controller: 'CategoriesController',
        controllerAs: 'vm',
        data: {
          pageTitle: '{{ categoryResolve.categoryName }}'
        },
        resolve: {
          categoryResolve: getCategory
        }

      });
  }


  function getCategory($stateParams, CategoriesService) {
    return CategoriesService.get({
      categoryId: $stateParams.categoryId
    }).$promise;
  }

  newCategory.$inject = ['CategoriesService'];

  function newCategory(CategoriesService) {
    return new CategoriesService();
  }
}());
