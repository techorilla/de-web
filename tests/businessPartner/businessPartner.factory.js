(function(){

  /* global module, inject */

  'use strict';

  describe('Factory: businessPartner', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.businessPartner'));

    var businessPartner;

    beforeEach(inject(function($injector){

      businessPartner = $injector.get('businessPartner');

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
