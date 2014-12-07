var express = require('express');
var router = express.Router();
var multer = require('multer');
var multSettings = {
    inMemory: true
 };
var Record = require('../models/record');

/* GET home page. */
router.get('/', function (req, res) {
  	res.render('index', { title: 'Album List' });
});

/* POST album information */

router.post('/album', multer(multSettings), function (req, res) {
	if(req.files && req.files.album_csv) {
		res.send(req.files.album_csv.buffer.toString());
	}
});

module.exports = router;
