(function () {
  'use strict';

  describe('Categories Route Tests', function () {
    // Initialize global variables
    var $scope,
      CategoriesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _CategoriesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      CategoriesService = _CategoriesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('categories');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/categories');
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
          liststate = $state.get('categories.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should not be abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('/modules/categories/client/views/list-categories.client.view.html');
        });
      });

      describe('Handle Trailing Slash', function () {
        beforeEach(inject(function ($state, $rootScope, $templateCache) {
          $templateCache.put('/modules/categories/client/views/list-categories.client.view.html', '');

          $state.go('categories.list');
          $rootScope.$digest();
        }));

        it('Should remove trailing slash', inject(function ($state, $location, $rootScope) {
          $location.path('categories/');
          $rootScope.$digest();

          expect($location.path()).toBe('/categories');
          expect($state.current.templateUrl).toBe('/modules/categories/client/views/list-categories.client.view.html');
        }));
      });
    });
  });
}());
