'use strict';

describe('Service: audio', function () {

  // load the service's module
  beforeEach(module('12oder3App'));

  // instantiate service
  var audio;
  beforeEach(inject(function (_audio_) {
    audio = _audio_;
  }));

  it('should do something', function () {
    expect(!!audio).toBe(true);
  });

});
