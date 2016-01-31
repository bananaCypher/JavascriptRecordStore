var RecordStore = function(name, city, balance){
    this.name = name;
    this.city = city;
    this.inventory = [];
    this.balance = balance;
};
RecordStore.prototype = {
    addRecords: function(){
        for (record of arguments) {
            this.inventory.push(record);
        }
    },
    listInventory: function(){
        listString = '';
        for (record of this.inventory){
            listString = listString + record.title + ' by ';
            listString = listString + record.artist + ' - '
            listString = listString + this.penceToPounds(record.price) + '\n';
        }
        return listString
    },
    penceToPounds:  function(pence){
       return '£' + (pence / 100).toFixed(2);
    },
    sellRecord: function(collector, record){
        //var recordIndex = this.inventory.indexOf(record);    
        var recordIndex = this.indexOf(this.inventory, record);
        if (recordIndex === -1) {
            throw new Error("The record store doesn't have this record to sell");
        }
        collector.buyRecord(record);
        this.inventory.splice(recordIndex, 1);
        this.balance += record.price;
    },
    buyRecord: function(record) {
        if (record.price > this.balance) {
            throw new Error("The record store doesn't have enough money to purchase this record");
        }
        this.inventory.push(record);
        this.balance -= record.price; 
    },
    financialReport: function(){
        var report = "The store currently has a balance of: " + this.penceToPounds(this.balance) + "\n";
        report = report + "The store has records worth a total of: " + this.penceToPounds(this.inventoryTotalPrice());
        return report;
    },
    inventoryTotalPrice: function(){
        var sum = 0;
        for (record of this.inventory) {
            sum += record.price;
        }
        return sum;
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

module.exports = RecordStore;
