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
        // data: {
        // roles: ['admin']
        // }

        // TODO
        // add more states here

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
