(function(){

  /* global module, inject */

  'use strict';

  describe('Controller: Analytics', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.analytics'));

    var ctrl;
    var scope;

    beforeEach(inject(function($controller, $injector){

      scope = $injector.get('$rootScope');

      ctrl = $controller('Analytics', {
        //add injectable services
      });

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
