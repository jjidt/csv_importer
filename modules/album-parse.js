module.exports = function albumParse (csvFile, callback) {
	var _ = require('lodash'),
		parsedData = {},
		csvLines,
		headerLine,
		err,
		data;

	csvLines = csvFile.toString().split('\n');

	headerLine = csvLines.shift().split(',');

	headerLine = _.map(headerLine, function(label) {
		return label.toLowerCase();
	});

	if (!_.isEqual(headerLine, ['artist', 'album', 'release', 'year', 'rating'])) {

	}

	_.each(csvLines, function(line) {

	});



	callback(err, data);
}