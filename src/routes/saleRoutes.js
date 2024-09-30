const express = require('express');
const saleController = require('../controllers/saleController');

const router = express.Router();

router.post('/', saleController.recordSale);
router.get('/', saleController.getSales);

module.exports = router;
