(function(){

  /* global module, inject */

  'use strict';

  describe('Factory: tradebook', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.tradebook'));

    var tradebook;

    beforeEach(inject(function($injector){

      tradebook = $injector.get('tradebook');

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
