const express = require('express');
const router = express.Router()
const productController = require('../../controller/product.controller')

router.route("/bulk-delete").delete(productController.bulkDeleteProducts)
router.route("/bulk-update").patch(productController.bulkUpdateProducts)
router.route('/')
    .get(productController.getProducts)
    .post(productController.createProducts)

router.route('/:id')
    .patch(productController.updateProducts).delete(productController.deleteProductById)

module.exports = router