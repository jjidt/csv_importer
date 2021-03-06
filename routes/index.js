var express = require('express'),
	router = express.Router(),
	multer = require('multer'),
	multSettings = {inMemory: true},
	Record = require('../models/record'),
	albumParse = require('../helpers/album-parse'),
	constants = require('../constants'),
	async = require('async');

/* GET home page. */
router.get('/', function (req, res) {
  	res.redirect('/albums');
});

/* GET all albums */
router.get('/albums', function (req, res) {
	Record.find({}).sort({'release-year': -1}).exec(function (err, data) {
		res.render('album-index', {
			title: 'Album Importer',
			items: data,
			alert: req.flash('alert'),
			success: req.flash('success'),
			fail: req.flash('fail')
		});
	});
});

/* POST album information */
router.post('/album', multer(multSettings), function (req, res) {
	if(req.files && req.files.album_csv && req.files.album_csv.extension === 'csv') {
		
		albumParse(req.files.album_csv.buffer, function (err, data) {

			if (err) {
				req.flash('alert', err.message);
				res.redirect('back');

			} else {
				saveItems(data, function (failedItems) {
					req.flash('success', (data.length - failedItems.length) + ' ' + constants.success);
					if (failedItems.length > 0) {
						req.flash('fail', failedItems.length + ' ' + constants.fail);
					}
					res.redirect('/albums');
				});
			}
		});
	} else if (req.files && req.files.album_csv) {
		req.flash('alert', constants.wrongType);
		res.redirect('back');
	} else {
		req.flash('alert', constants.noFile);
		res.redirect('back');
	}
});

/**
 * turn array of objects into mongoose models and save to mongodb, keep track of unsaved items
 * @param  {array}  data [array of album information objects]
 * @param  {callback function} cb   [function to be called after all records have attempted save]
 * @return {array} [failed items, provided as parameter to callback function] 
 */
function saveItems(data, cb) {
	var failedItems = [];

	async.each(data, function (item, callback) {
		new Record(item).save(function (error) {
			if (error) { 
				failedItems.push(item);
			}
			callback();
		});
	}, function () {
			cb(failedItems);
	});
}

module.exports = router;
