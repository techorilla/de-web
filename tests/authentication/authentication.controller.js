(function(){

  /* global module, inject */

  'use strict';

  describe('Controller: Authentication', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.authentication'));

    var ctrl;
    var scope;

    beforeEach(inject(function($controller, $injector){

      scope = $injector.get('$rootScope');

      ctrl = $controller('Authentication', {
        //add injectable services
      });

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
