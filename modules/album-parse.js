module.exports = function albumParse (csvFile, callback) {
	var _ = require('lodash'),
		parsedData = {},
		csvLines,
		headerLine,
		data = [],
		err;

	csvLines = csvFile.toString().split('\n');

	headerLine = csvLines.shift().split(',');

	headerLine = _.map(headerLine, function(label) {
		return label.toLowerCase();
	});

	if (!_.isEqual(headerLine, ['artist', 'album', 'release year', 'rating'])) {
		err = new Error;
		err.message = "The header line in your csv file is formatted incorrectly, please make sure this is an album info file with columns labeled artist,album,release,year,rating";
		callback(err, data);
		return false;
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