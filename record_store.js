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
}

module.exports = RecordStore;
