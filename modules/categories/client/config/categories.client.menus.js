(function () {
  'use strict';

  angular
    .module('categories')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Categories',
      state: 'categories.list',
      roles: ['*']
    });
  }
}());
