var express = require('express');
var router = express.Router();
var multer = require('multer');
var multSettings = {
    inMemory: true
 };
var Record = require('../models/record');
var albumParse = require('../helpers/album-parse');

/* GET home page. */
router.get('/', function (req, res) {
  	res.render('index', { title: 'Album List' });
});

/* GET all albums */
router.get('/')

/* POST album information */

router.post('/album', multer(multSettings), function (req, res) {
	if(req.files && req.files.album_csv) {
		req.files.album_csv
	}
});

module.exports = router;
