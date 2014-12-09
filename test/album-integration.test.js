var expect = require('chai').expect,
	Browser = require('zombie'),
	app = require('../app'),
	browser;


describe('submitting a file', function () {
	before(function () {
		app.set('port', 1969);

		var server = app.listen(app.get('port'), function() {
  			console.log('Express test server listening on port ' + server.address().port);
		});
		Browser.localhost('album-upload.com', 1969);
		browser = Browser.create();
	});

	it('should successfully submit a correctly formatted file', function(done) {
		browser.visit('/albums', function (error) {
		  if (error) throw error;

		  // Fill email, password and submit form
			browser.
				attach('album_csv', 'csv/integration-test.csv').
				pressButton('Submit', function(error) {
					if (error) throw error;

				// Form submitted, new page loaded.
				expect(browser.success).to.equal(true);
				expect(browser.text('body')).to.contain('successfully');
				done();
			});
		});
	});

	it('should display an error when an incorrectly formatted file is uploaded', function(done) {
		browser.visit('/albums', function (error) {
		  if (error) throw error;

		  // Fill email, password and submit form
			browser.
				attach('album_csv', 'csv/integration-incorrect-header.csv').
				pressButton('Submit', function(error) {
					if (error) throw error;

				// Form submitted, new page loaded.
				expect(browser.success).to.equal(true);
				expect(browser.text('body')).to.contain('formatted incorrectly');
				done();
			});
		});
	});

	it('should display an error when an a file of the wrong type is uploaded', function(done) {
		browser.visit('/albums', function (error) {
		  if (error) throw error;

			browser.
				attach('album_csv', 'app.js').
				pressButton('Submit', function(error) {
					if (error) throw error;

				expect(browser.success).to.equal(true);
				expect(browser.text('body')).to.contain('wrong file type');
				done();
			});
		});
	});
});