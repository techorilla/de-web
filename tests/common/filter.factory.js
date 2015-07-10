(function(){

  /* global module, inject */

  'use strict';

  describe('Factory: filter', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.common'));

    var filter;

    beforeEach(inject(function($injector){

      filter = $injector.get('filter');

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
