const express = require('express');
const router = express.Router();
const siatController = require('../controllers/siatController');


router.get('/cuis', siatController.getCuis.bind(siatController));

module.exports = router;
