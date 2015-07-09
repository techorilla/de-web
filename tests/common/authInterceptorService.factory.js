(function(){

  /* global module, inject */

  'use strict';

  describe('Factory: authInterceptorService', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.common'));

    var authInterceptorService;

    beforeEach(inject(function($injector){

      authInterceptorService = $injector.get('authInterceptorService');

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
