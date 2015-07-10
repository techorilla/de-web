(function(){

  /* global module, inject */

  'use strict';

  describe('Controller: AddBusinessPartner', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.businessPartner'));

    var ctrl;
    var scope;

    beforeEach(inject(function($controller, $injector){

      scope = $injector.get('$rootScope');

      ctrl = $controller('AddBusinessPartner', {
        //add injectable services
      });

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
