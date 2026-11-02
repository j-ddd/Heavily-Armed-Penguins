const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const flagsLength = 2;

// Create Schema
const BuilderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: '' 
  },
  deployed: {
    type: String,
    default: 'False' 
  },
  content: {
    type: String,
    default: 'N/A'
  },
  flags: Array.from({length: flagsLength}, (v, i) => 'Disabled')
}, {
  timestamps: true
});

BuilderSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Builder', BuilderSchema);
