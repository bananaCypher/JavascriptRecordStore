var assert = require('assert');
var Record = require('./record');

describe('Record', function(){
    it('should have an artist', function(){
        var record = new Record('Pink Floyd', 'Dark Side of the Moon', 2000);
        assert.equal(record.artist, 'Pink Floyd');
    });
    it('should have a title', function(){
        var record = new Record('Pink Floyd', 'Dark Side of the Moon', 2000);
        assert.equal(record.title, 'Dark Side of the Moon'); 
    });
    it('should have a price', function(){
        var record = new Record('Pink Floyd', 'Dark Side of the Moon', 2000);
        assert.equal(record.price, 2000); 
    });
});
