(function(){

  /* global module, inject */

  'use strict';

  describe('Factory: documentExporter', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.common'));

    var documentExporter;

    beforeEach(inject(function($injector){

      documentExporter = $injector.get('documentExporter');

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
