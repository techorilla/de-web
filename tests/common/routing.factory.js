(function(){

  /* global module, inject */

  'use strict';

  describe('Factory: routing', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.common'));

    var routing;

    beforeEach(inject(function($injector){

      routing = $injector.get('routing');

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
