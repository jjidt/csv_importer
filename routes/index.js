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
router.get('/albums', function (req, res) {

});

/* POST album information */

router.post('/album', multer(multSettings), function (req, res) {
	if(req.files && req.files.album_csv) {
		albumParse(req.files.album_csv.buffer, function (err, data) {
			if (err) res.send(err);

			res.send(data);
		});
	}
});

module.exports = router;
