var express = require('express');
var router  = express.Router();
var c       = require('../controllers/auth.controller');
var auth    = require('../middleware/auth.middleware');

router.post('/register', c.register);
router.post('/login',    c.login);
router.post('/refresh',  c.refresh);
router.post('/logout',   auth.protect, c.logout);
router.get('/me',        auth.protect, c.me);

module.exports = router;
