(function(){

  /* global module, inject */

  'use strict';

  describe('Controller: AlertModal', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.modal'));

    var ctrl;
    var scope;

    beforeEach(inject(function($controller, $injector){

      scope = $injector.get('$rootScope');

      ctrl = $controller('AlertModal', {
        //add injectable services
      });

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
