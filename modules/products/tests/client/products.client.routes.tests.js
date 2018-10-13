(function () {
  'use strict';

  describe('Products Route Tests', function () {
    // Initialize global variables
    var $scope,
      ProductsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ProductsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ProductsService = _ProductsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('products');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/products');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('List Route', function () {
        var liststate;
        beforeEach(inject(function ($state) {
          liststate = $state.get('products.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should not be abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('/modules/products/client/views/list-products.client.view.html');
        });
      });

      describe('Handle Trailing Slash', function () {
        beforeEach(inject(function ($state, $rootScope, $templateCache) {
          $templateCache.put('/modules/products/client/views/list-products.client.view.html', '');

          $state.go('products.list');
          $rootScope.$digest();
        }));

        it('Should remove trailing slash', inject(function ($state, $location, $rootScope) {
          $location.path('products/');
          $rootScope.$digest();

          expect($location.path()).toBe('/products');
          expect($state.current.templateUrl).toBe('/modules/products/client/views/list-products.client.view.html');
        }));
      });
    });
  });
}());
