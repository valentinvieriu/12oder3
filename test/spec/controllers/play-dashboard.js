'use strict';

describe('Controller: PlayDashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('12oder3App'));

  var PlayDashboardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlayDashboardCtrl = $controller('PlayDashboardCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
