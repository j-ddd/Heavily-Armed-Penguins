const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Create Schema
const MachineSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: '' 
  },
  ip: {
    type: String,
    required: true,
    default: ''
  },
  username: {
    type: String,
    required: true
  },
  os: {
    type: String,
    default: 'N/A'
  },
  credits: {
    type: String,
    default: 'Refer to hostname'
  }
}, {
  timestamps: true
});

MachineSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('MachineModel', MachineSchema);
