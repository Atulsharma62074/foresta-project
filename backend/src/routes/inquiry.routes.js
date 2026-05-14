var express  = require('express');
var router   = express.Router();
var c        = require('../controllers/inquiry.controller');
var auth     = require('../middleware/auth.middleware');

router.post('/',     c.create);
router.get('/',      auth.protect, auth.authorize('admin', 'superadmin'), c.getAll);
router.patch('/:id', auth.protect, auth.authorize('admin', 'superadmin'), c.update);

module.exports = router;
