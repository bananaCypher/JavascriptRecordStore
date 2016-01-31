var RecordStore = function(name, city){
    this.name = name;
    this.city = city;
    this.inventory = [];
};
RecordStore.prototype = {
    addRecords: function(){
        for (record of arguments) {
            this.inventory.push(record);
        }
    },
}

module.exports = RecordStore;
