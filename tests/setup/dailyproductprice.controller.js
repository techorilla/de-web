(function(){

  /* global module, inject */

  'use strict';

  describe('Controller: DailyProductPrice', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.setup'));

    var ctrl;
    var scope;

    beforeEach(inject(function($controller, $injector){

      scope = $injector.get('$rootScope');

      ctrl = $controller('DailyProductPrice', {
        //add injectable services
      });

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());