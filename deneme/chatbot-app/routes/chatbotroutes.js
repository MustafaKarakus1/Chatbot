const express = require('express');
const router = express.Router();
const { chatWithBot } = require('../controllers/chatbotcontroller');

router.post('/chat', chatWithBot);

module.exports = router;
