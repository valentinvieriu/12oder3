'use strict';

describe('Controller: StartPartyCtrl', function () {

  // load the controller's module
  beforeEach(module('12oder3App'));

  var StartPartyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StartPartyCtrl = $controller('StartPartyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
