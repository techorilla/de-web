(function(){

  /* global module, inject */

  'use strict';

  describe('Controller: Logs', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.systemLogs'));

    var ctrl;
    var scope;

    beforeEach(inject(function($controller, $injector){

      scope = $injector.get('$rootScope');

      ctrl = $controller('Logs', {
        //add injectable services
      });

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
