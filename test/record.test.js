var expect = require('chai').expect,
	Record = require('../models/record'),
	testDB = require('../config').db.test,
	mongoose = require('mongoose');

describe(Record, function() {
	beforeEach(function(done) {
    	if (mongoose.connection.db) return done();

    	mongoose.connect(testDB, done);
	});

	after(function(done) {
		if (mongoose.connection.db) {
			mongoose.connection.db.dropDatabase(function() {
				done();
			});
		}
	});

	describe('#save()', function() {
		it('should successfully save a record to the database', function(done) {
			new Record({
				artist: 'a',
				album: 'b', 
				'release-year': 1994, 
				rating: 5
			})
			.save(done);
		});

		it('should validate the presence of artist name before saving to database', function(done) {
			new Record({
				artist: '', 
				album: 'b', 
				'release-year': 1994, 
				rating: 5
			})
			.save(function(err) {
				expect(err).to.exist();
				done();
			});
		});

		it('should validate the presence of album title before saving to database', function(done) {
			new Record({
				artist: 'c',
				album: '',
				'release-year': 1994,
				rating: 5
			})
			.save(function(err) {
				expect(err).to.exist();
				done();
			});
		})
	});
});