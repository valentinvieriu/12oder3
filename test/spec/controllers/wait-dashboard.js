'use strict';

describe('Controller: WaitDashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('12oder3App'));

  var WaitDashboardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WaitDashboardCtrl = $controller('WaitDashboardCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
