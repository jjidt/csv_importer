var expect = require('chai').expect,
	fs = require('fs'),
	albumParse = require('../modules/album-parse');

describe('albumParse', function() {
	it('should take a csv file and return an array of json objects', function(done) {
		fs.readFile('csv/test.csv', function(err, data) {
			if (err) throw err;
			albumParse(data, function(err, parsedData) {
				expect(parsedData).to.deep.equal([
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
				]);
				done();
			});
		});
	});
});
