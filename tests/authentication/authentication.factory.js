(function(){

  /* global module, inject */

  'use strict';

  describe('Factory: authentication', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.authentication'));

    var authentication;

    beforeEach(inject(function($injector){

      authentication = $injector.get('authentication');

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
