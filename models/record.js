var mongoose = require('mongoose');

var recordSchema = new mongoose.Schema({
	artist: {
		type: String,
		index: true,
		required: true
	},
	album: {
		type: String,
		index: true,
		required: true
	},
	'release-year': {
		type: Number,
	},
	rating: {
		type: Number,
	}
});

var Record = mongoose.model('Record', recordSchema);

module.exports = Record;