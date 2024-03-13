let express = require('express');
let protectRoute = require('../middleware/protectRoute');
const { sendMessage, getMessages } = require('../controllers/message.control');
let router = express.Router();

router.post('/send/:id', protectRoute, sendMessage);
router.get('/:id', protectRoute, getMessages);

module.exports = router;