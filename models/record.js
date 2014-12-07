var mongoose = require('mongoose');

var recordSchema = new mongoose.Schema({
	artist: {
		type: String,
		index: true
	},
	album: {
		type: String,
		index: true
	},
	'release-date': {
		type: Number,
		index: true
	},
	rating: {
		type: Number,
		index: true
	}
});

var Record = mongoose.model('Record', recordSchema);

module.exports = Record;