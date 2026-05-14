var express  = require('express');
var router   = express.Router();
var c        = require('../controllers/admin.controller');
var auth     = require('../middleware/auth.middleware');

var protect  = auth.protect;
var authorize = auth.authorize;

router.get('/dashboard',   protect, authorize('admin', 'superadmin'), c.dashboard);
router.get('/users',       protect, authorize('admin', 'superadmin'), c.getUsers);
router.patch('/users/:id', protect, authorize('admin', 'superadmin'), c.updateUser);
router.get('/logs',        protect, authorize('admin', 'superadmin'), c.getLogs);

module.exports = router;
