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
        for (record of this.inventory) {
            listString = listString + record.title + ' by ';
            listString = listString + record.artist + ' - '
            listString = listString + this.penceToPounds(record.price) + '\n';
        }
        return listString
    },
    penceToPounds:  function(pence){
       return '£' + (pence / 100).toFixed(2);
    }
}

module.exports = RecordStore;
