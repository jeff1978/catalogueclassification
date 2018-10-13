(function () {
  'use strict';

  describe('Categories Controller Tests', function () {
    // Initialize global variables
    var CategoriesController,
      $scope,
      $httpBackend,
      $state,
      CategoriesService,
      mockCategory;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _CategoriesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      CategoriesService = _CategoriesService_;

      // create mock category
      mockCategory = new CategoriesService({
        _id: '525a8422f6d0f87f0e407a33',
        categoryName: 'A MEAN category'
      });

      // Initialize the Categories controller.
      CategoriesController = $controller('CategoriesController as vm', {
        $scope: $scope,
        categoryResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));
  });
}());
