(function(){

  /* global module, inject */

  'use strict';

  describe('Controller: NewUser', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.setup/newUser'));

    var ctrl;
    var scope;

    beforeEach(inject(function($controller, $injector){

      scope = $injector.get('$rootScope');

      ctrl = $controller('NewUser', {
        //add injectable services
      });

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
