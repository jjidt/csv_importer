module.exports = albumParse;

/**
 * albumParse parses csv album-info into an array of json objects
 * @param  {Buffer}   csvFile  [buffered csv file of album-info]
 * @param  {Function} callback [function with err and data parameters for dealing with parsed data]
 * @return {boolean}           [true if successfully parsed, false if unsuccessful]
 */
function albumParse (csvFile, callback) {
	var _ = require('lodash'),
		csvLines,
		headerLine,
		data = [],
		err,
		splitItems,
		albumData;

	/**
	 * convert buffer to string and split by lines, split header-line into lowercase array of items
	 */
	csvLines = csvFile.toString().split('\n');
	headerLine = csvLines.shift().split(',');
	headerLine = _.map(headerLine, function(label) {
		return label.toLowerCase().trim();
	});

	/**
	 * check if the header line has the correct labels
	 */
	if (!_.isEqual(headerLine, ['artist', 'album', 'release year', 'rating'])) {
		err = new Error();
		err.message = 'The header line in your csv file is formatted incorrectly, please make sure this is an album info file with columns labeled artist,album,release year,rating';
		callback(err, data);
		return false;
	}	

	/**
	 * take the album-info Array and parse each record into a json object
	 */
	_.forEach(csvLines, function(line) {
		splitItems = line.split(',', 4);
		albumData = {
			'artist': splitItems[0].trim(),
			'album': splitItems[1].trim(),
			'release-year': +splitItems[2] || null,
			'rating': +splitItems[3] >= 1 && +splitItems[3] <= 5 ? +splitItems[3] : null
		};
		data.push(albumData);
	});

	callback(err, data);

	return true;
}