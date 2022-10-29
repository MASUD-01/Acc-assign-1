const express = require('express');
const router = express.Router()
const productController = require('../../controller/product.controller')

router.route('/')
    .get(productController.getProducts)
    .post(productController.createProducts)

router.route("/bulk-update").patch(productController.bulkUpdateProducts)
router.route('/:id')
    .patch(productController.updateProducts)

module.exports = router