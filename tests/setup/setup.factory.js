(function(){

  /* global module, inject */

  'use strict';

  describe('Factory: setup', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.setup'));

    var setup;

    beforeEach(inject(function($injector){

      setup = $injector.get('setup');

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
