(function(){

  /* global module, inject */

  'use strict';

  describe('Factory: navigation', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.common'));

    var navigation;

    beforeEach(inject(function($injector){

      navigation = $injector.get('navigation');

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
