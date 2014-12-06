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

	data = [
					{
						"artist": "ABBA",
						"album": "abbaAlbum",
						"release-year": 1975,
						"rating": 1
					},
					{
						"artist": "HUEYLEWIS",
						"album": "hueyLewis",
						"release-year": 1985,
						"rating": 3
					},
					{
						"artist": "ZZTOP",
						"album": "zzTopAlbum",
						"release-year": 1980,
						"rating": 5
					}
				]

	callback(err, data);
}