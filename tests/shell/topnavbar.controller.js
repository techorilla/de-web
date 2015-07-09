(function(){

  /* global module, inject */

  'use strict';

  describe('Controller: TopNavBar', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.shell'));

    var ctrl;
    var scope;

    beforeEach(inject(function($controller, $injector){

      scope = $injector.get('$rootScope');

      ctrl = $controller('TopNavBar', {
        //add injectable services
      });

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
