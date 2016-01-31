var assert = require('assert');
var Record = require('./record');
var RecordStore = require('./record_store');
var RecordCollector = require('./record_collector');

function createDummyStore() {
    var record1 = new Record('Pink Floyd', 'Dark Side of the Moon', 2000);
    var record2 = new Record('Queen', 'News of the World', 2500);
    var record3 = new Record('Dio', 'Holy Diver', 2550);
    var recordStore = new RecordStore('Vinyl Villians', 'Edinburgh', 100000);
    recordStore.addRecords(record1, record2, record3);
    return recordStore;
}

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
    it('should have an inventory with multiple records', function(){
        var record1 = new Record('Pink Floyd', 'Dark Side of the Moon', 2000);
        var record2 = new Record('Queen', 'News of the World', 2500);
        var record3 = new Record('Dio', 'Holy Diver', 2550);
        var recordStore = new RecordStore('Vinyl Villians', 'Edinburgh');
        recordStore.addRecords(record1, record2, record3);
        assert.equal(recordStore.inventory.length, 3);
    });
    it('has a balance in cash', function(){
        var recordStore = new RecordStore('Vinyl Villians', 'Edinburgh', 100000);
        assert.equal(recordStore.balance, 100000);
    });
    it("can list it's inventory", function(){
        var recordStore = createDummyStore();
        var returnString = "Dark Side of the Moon by Pink Floyd - £20.00\nNews of the World by Queen - £25.00\nHoly Diver by Dio - £25.50\n"
        assert.equal(recordStore.listInventory(), returnString);
    });
    it("can properly convert pence to pounds", function(){
        var recordStore = createDummyStore();
        assert.equal(recordStore.penceToPounds(1231), '£12.31');
        assert.equal(recordStore.penceToPounds(1000), '£10.00');
    });
    it("can sell a record", function(){
        var recordStore = createDummyStore();
        recordStore.sellRecord(recordStore.inventory[0]);
        assert.equal(recordStore.inventory[0].artist, 'Queen');
        assert.equal(recordStore.balance, 102000);
    });
    it("can report on financial status", function(){
        var recordStore = createDummyStore();
        var returnString = "The store currently has a balance of: £1000.00\nThe store has records worth a total of: £70.50";
        assert.equal(recordStore.financialReport(), returnString);
    });
    it("can work out the total price of the inventory", function(){
        var recordStore = createDummyStore();
        assert.equal(recordStore.inventoryTotalPrice(), 7050);
    });
});
