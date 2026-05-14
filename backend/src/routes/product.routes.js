var express  = require('express');
var router   = express.Router();
var c        = require('../controllers/product.controller');
var auth     = require('../middleware/auth.middleware');

router.get('/',      c.getAll);
router.get('/:id',   c.getOne);
router.post('/',     auth.protect, auth.authorize('admin', 'superadmin'), c.create);
router.put('/:id',   auth.protect, auth.authorize('admin', 'superadmin'), c.update);
router.delete('/:id',auth.protect, auth.authorize('admin', 'superadmin'), c.remove);

module.exports = router;
