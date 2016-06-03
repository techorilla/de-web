(function(){

  /* global module, inject */

  'use strict';

  describe('Factory: logs', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.systemLogs'));

    var logs;

    beforeEach(inject(function($injector){

      logs = $injector.get('logs');

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
