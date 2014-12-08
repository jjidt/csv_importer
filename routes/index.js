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

/* GET home page. */
router.get('/', function (req, res) {
  	res.render('index', { 
  		title: 'Album List', 
  		alert: req.flash('alert')
  	});
});

/* GET all albums */
router.get('/albums', function (req, res) {
	req.flash('alert', 'the flash worked');
	res.redirect('/');
});

/* POST album information */
router.post('/album', multer(multSettings), function (req, res) {
	if(req.files && req.files.album_csv) {
		failedItems = [];
		albumParse(req.files.album_csv.buffer, function (err, data) {
			if (err) res.render(err);
			_.forEach(data, function(item) {
				new Record(item).save(function(err) {
					if (err) return failedItems.push(item);
				});
			});
		});
	}
});

module.exports = router;
