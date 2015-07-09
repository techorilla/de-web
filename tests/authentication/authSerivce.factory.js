(function(){

  /* global module, inject */

  'use strict';

  describe('Factory: authSerivce', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.authentication'));

    var authSerivce;

    beforeEach(inject(function($injector){

      authSerivce = $injector.get('authSerivce');

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
