var mongoose = require('mongoose');

var recordSchema = new mongoose.Schema({
	artist: {
		type: String,
		required: true
	},
	album: {
		type: String,
		required: true
	},
	'release-year': {
		type: Number,
		index: true
	},
	rating: {
		type: Number,
	}
});

recordSchema.index({ artist: 1, album: 1 }, { unique: true });

var Record = mongoose.model('Record', recordSchema);

module.exports = Record;