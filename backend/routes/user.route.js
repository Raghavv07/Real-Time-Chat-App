let express = require('express');
let router = express.Router();
let protectRoute = require('../middleware/protectRoute');
const { getUsersForSidebar } = require('../controllers/user.controll');

router.get('/', protectRoute, getUsersForSidebar);

module.exports = router;