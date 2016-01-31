var RecordCollector = function(balance){
    this.balance = balance;
    this.collection = [];
};

RecordCollector.prototype = {
    buyRecord: function(record){
        if (record.price > this.balance) {
            throw new Error("The record collector doesn't have enough money to purchase this record");
        }
        this.collection.push(record);
        this.balance -= record.price; 
    },
    sellRecord: function(store, record){
        var recordIndex = this.indexOf(this.collection, record); 
        if (recordIndex === -1) {
            throw new Error("The record collector doesn't have this record to sell");
        }
        store.buyRecord(record);
        this.collection.splice(recordIndex, 1);
        this.balance += record.price;
    },
    indexOf: function(array, object){
        arrayLoop:
        for (var i=0; i<array.length; i++) {
            for (property in object) {
                if (object[property] != array[i][property]) {
                    continue arrayLoop;
                }
            }
            for (property in array[i]) {
                if (object[property] != array[i][property]) {
                    continue arrayLoop;
                }
            }
            return i;
        }
        return -1;
    }
}

module.exports = RecordCollector;
