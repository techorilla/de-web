(function(){

  /* global module, inject */

  'use strict';

  describe('Factory: dropDownConfig', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.common'));

    var dropDownConfig;

    beforeEach(inject(function($injector){

      dropDownConfig = $injector.get('dropDownConfig');

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
