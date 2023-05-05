const app = require('express');
const router = app.Router();
const auth = require('./auth/verify-token');

router.use('/v1/auth', require('./auth')); // tested
router.use('/v1/roles', auth, require('./roles')); // tested
router.use('/v1/users', auth, require('./users')); // tested
router.use('/v1/organisations', auth, require('./organisations')); // tested
router.use('/v1/support-query', auth, require('./support-query'));  // tested
router.use('/v1/menus', auth, require('./menus')); // tested
router.use('/v1/menus-permissions', auth, require('./menus-permissions')); // tested
router.use('/v1/organisations-users', auth, require('./organisations-users'));  //tested
router.use('/v1/calving-types', auth, require('./calving-type'));  //tested
router.use('/v1/breeds', auth, require('./breed'));  //tested
router.use('/v1/colors', auth, require('./color'));  //tested
router.use('/v1/occurrences', auth, require('./occurrence'));  //tested
router.use('/v1/calving-operators', auth, require('./calving-operator'));  //tested
router.use('/v1/locations', auth, require('./location'));  //tested
router.use('/v1/groups', auth, require('./group'));  //tested
router.use('/v1/semens', auth, require('./semen'));  //tested
router.use('/v1/status', auth, require('./status'));  //tested
router.use('/v1/siblings-types', auth, require('./siblings-type'));  //tested
router.use('/v1/animals', auth, require('./animal'));  //tested

module.exports = router;