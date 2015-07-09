(function(){

  /* global module, inject */

  'use strict';

  describe('Factory: product', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.product'));

    var product;

    beforeEach(inject(function($injector){

      product = $injector.get('product');

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
