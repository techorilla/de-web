(function(){

  /* global module, inject */

  'use strict';

  describe('Factory: alertModalFactory', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.modal'));

    var alertModalFactory;

    beforeEach(inject(function($injector){

      alertModalFactory = $injector.get('alertModalFactory');

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
