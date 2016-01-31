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
    sellRecord: function(record){
        var recordIndex = this.inventory.indexOf(record);    
        this.inventory.splice(recordIndex, 1);
        this.balance += record.price;
    },
}

module.exports = RecordStore;
