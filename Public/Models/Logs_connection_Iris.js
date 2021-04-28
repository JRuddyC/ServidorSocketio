var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const DeviceSchema = new Schema({
    name: String,
    ip: String,
    gateway: String,
    mask: String,
    mac: String,
    device_type: String,
    date_time: String
}); 

module.exports = mongoose.model('logs_connection_iris', DeviceSchema);