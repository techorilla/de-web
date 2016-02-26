(function(){

  /* global module, inject */

  'use strict';

  describe('Factory: analytics', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.analytics'));

    var analytics;

    beforeEach(inject(function($injector){

      analytics = $injector.get('analytics');

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
