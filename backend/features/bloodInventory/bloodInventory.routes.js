// routes/bloodInventory.routes.js

const express = require('express');
const router  = express.Router();
const ctrl    = require('./bloodInventory.controller');

router.get('/', ctrl.getInventory);

module.exports = router;
