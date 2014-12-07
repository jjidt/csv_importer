var expect = require('chai').expect,
	Record = require('../models/record'),
	testDB = require('../config').db.test,
	mongoose = require('mongoose');

describe(Record, function() {
	beforeEach(function(done) {
    	if (mongoose.connection.db) return done();

    	mongoose.connect(testDB, done);
	});

	it('should successfully save a record to the database', function(done) {
		new Record({artist: 'a', album: 'b', 'release-year': 1994, rating: 5}).save(done);
	});

	it('should validate the presence of artist name before saving to database', function(done) {
		new Record({artist: '', album: 'b', 'release-year': 1994, rating: 5}).save(done);
	});
});