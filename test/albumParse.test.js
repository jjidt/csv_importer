var expect = require('chai').expect,
	fs = require('fs'),
	albumParse = require('../helpers/album-parse');

describe('albumParse', function() {
	it('should take a csv file and return an array of json objects', function (done) {
		fs.readFile('csv/test.csv', function (err, data) {
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

	it('should return an error when the header line is not formatted correctly', function (done) {
		fs.readFile('csv/incorrect-header.csv', function (err, data) {
			if (err) throw err;
			albumParse(data, function (err, parsedData) {
				expect(err.message).to.equal("The header line in your csv file is formatted incorrectly, please make sure this is an album info file with columns labeled artist,album,release year,rating");
				done();
			});
		});
	});

	it('should not return an error when the header line is formatted correctly', function(done) {
		fs.readFile('csv/test.csv', function (err, data) {
			if (err) throw err;
			albumParse(data, function (err, parsedData) {
				expect(err).to.not.exist();
				done();
			});
		});
	});

	it('should ignore whitespace on both ends of header line labels', function (done) {
		fs.readFile('csv/whitespace.csv', function (err, data) {
			if (err) throw err;
			albumParse(data, function (err, parsedData) {
				expect(err).to.not.exist();
				done();
			});
		});
	});

	it('should convert empty number fields to null value', function (done) {
		fs.readFile('csv/empty-values.csv', function(err, data) {
			if (err) throw err;
			albumParse(data, function (err, parsedData) {
				expect(parsedData[1].rating).to.eq(null);
				done();
			});
		});
	});

	it('should return a number title as a string', function (done) {
		fs.readFile('csv/number-title.csv', function (err, data) {
			if (err) throw err;
			albumParse(data, function (err, parsedData) {
				expect(parsedData[3].album).to.eq('5150');
				done();
			});
		});
	});

	it('should only allow a rating between 1 and 5, otherwise change it to null', function (done) {
		fs.readFile('csv/rating-range.csv', function (err, data) {
			if (err) throw err;
			albumParse(data, function (err, parsedData) {
				expect(parsedData[2].rating).to.eq('null');
				expect(parsedData[1].rating).to.eq(3);
			});
		});
	});
});
