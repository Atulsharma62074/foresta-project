const express = require('express');
const router  = express.Router();
const c       = require('../controllers/gem.controller');

router.get('/tenders', c.getTenders);

module.exports = router;