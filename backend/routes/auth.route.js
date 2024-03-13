let express = require('express');
const { signUp, login, logout } = require('../controllers/auth.control');
let router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;