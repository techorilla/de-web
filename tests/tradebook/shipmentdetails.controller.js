(function(){

  /* global module, inject */

  'use strict';

  describe('Controller: ShipmentDetails', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.tradebook'));

    var ctrl;
    var scope;

    beforeEach(inject(function($controller, $injector){

      scope = $injector.get('$rootScope');

      ctrl = $controller('ShipmentDetails', {
        //add injectable services
      });

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
