var assert = require('assert');
var Record = require('./record');
var RecordStore = require('./record_store');

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

describe('Record Store', function(){
    it('should have a name', function(){
        var recordStore = new RecordStore('Vinyl Villians', 'Edinburgh');
        assert.equal(recordStore.name, 'Vinyl Villians');
    });
    it('should have a city', function(){
        var recordStore = new RecordStore('Vinyl Villians', 'Edinburgh');
        assert.equal(recordStore.city, 'Edinburgh');
    });
});
