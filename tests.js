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
function createDummyCollector() {
    var record1 = new Record('Pink Floyd', 'The Wall', 2000);
    var record2 = new Record('The Beatles', 'Abbey Road', 2500);
    var record3 = new Record('Iron Maiden', 'The Number of the Beast', 2550);
    var recordCollector = new RecordCollector(10000);
    recordCollector.collection.push(record1);
    recordCollector.collection.push(record2);
    recordCollector.collection.push(record3);
    return recordCollector;
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
        var recordCollector = createDummyCollector();
        recordStore.sellRecord(recordCollector, recordStore.inventory[0]);
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
    it("can buy records from collectors", function(){
        var recordCollector = createDummyCollector();
        var recordStore = createDummyStore();
        var record = new Record('Pink Floyd', 'The Wall', 2000);
        recordStore.buyRecord(recordCollector, record);
        assert.equal(recordStore.balance, 102000);
        assert.equal(recordStore.collection.length, 4);
    });
});

describe("Record Colllector", function(){
    it("should have a balance", function(){
        var recordCollector = createDummyCollector();
        assert.equal(recordCollector.balance, 10000);
    });
    it("should have a collection of records", function(){
        var recordCollector = createDummyCollector();
        assert.equal(recordCollector.collection.length, 3); 
    });
    it("should be able to buy records", function(){
        var recordCollector = createDummyCollector();
        var recordStore = createDummyStore();
        var record = new Record('Pink Floyd', 'Dark Side of the Moon', 2000);
        recordCollector.buyRecord(recordStore, record);
        assert.equal(recordCollector.balance, 8000);
        assert.equal(recordCollector.collection.length, 4);
    });
    it("should be able to sell records", function(){
        var recordCollector = createDummyCollector();
        var recordStore = createDummyStore();
        var record = new Record('Pink Floyd', 'The Wall', 2000);
        recordCollector.sellRecord(recordStore, record);
        assert.equal(recordCollector.balance, 12000);
        assert.equal(recordCollector.collection.length, 2);
    });
    it("shouldn't be able to buy records it doesn't have money for", function(){
        
    });
    it("shouldn't be able to sell records it doesn't have", function(){

    });
});
