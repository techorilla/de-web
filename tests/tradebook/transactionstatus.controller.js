(function(){

  /* global module, inject */

  'use strict';

  describe('Controller: TransactionStatus', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.tradebook'));

    var ctrl;
    var scope;

    beforeEach(inject(function($controller, $injector){

      scope = $injector.get('$rootScope');

      ctrl = $controller('TransactionStatus', {
        //add injectable services
      });

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
