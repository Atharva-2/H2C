const express = require('express');
const { reportThreat, getThreats } = require('../controllers/threatController');
const router = express.Router();

router.post('/report', reportThreat);
router.get('/list', getThreats);

module.exports = router;
