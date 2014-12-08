var express = require('express');
var router = express.Router();
var multer = require('multer');
var multSettings = {
    inMemory: true
 };
var Record = require('../models/record');
var albumParse = require('../helpers/album-parse');
var _ = require('lodash');
var failedItems;
var constants = require('../constants');
var async = require('async');

/* GET home page. */
router.get('/', function (req, res) {
  	res.render('index', { 
  		title: 'Album List', 
  		alert: req.flash('alert')
  	});
});

/* GET all albums */
router.get('/albums', function (req, res) {
	Record.find({}).sort({'release-year': -1}).exec(function (err, data) {
		res.render('albums', {
			items: data,
			success: req.flash('success'),
			fail: req.flash('fail')
		});
	});
});

/* POST album information */
router.post('/album', multer(multSettings), function (req, res) {
	if(req.files && req.files.album_csv) {
		albumParse(req.files.album_csv.buffer, function (err, data) { 
			if (err) {
				req.flash('alert', err.message);
				res.redirect('back');
			}
			failedItems = [];
			_.forEach(data, function(item) {
				new Record(item).save(function(error) {
					if (error) { 
						console.log(error);
						failedItems.push(item);
						console.log(failedItems);
					}
				});
			});
			console.log(failedItems);
			req.flash('success', (data.length - failedItems.length) +  ' ' + constants.success);
			if (failedItems.length > 0) return req.flash('fail', failedItems.length + ' ' + constants.fail);
			res.redirect('/albums');
		});
	}
});

module.exports = router;
