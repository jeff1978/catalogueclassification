(function () {
  'use strict';

  angular
    .module('products')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Products',
      state: 'products.list',
      roles: ['*']
    });
  }
}());
