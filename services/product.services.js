const Product = require('../models/Products');

exports.getProductsServices = async () => {
    const products = await Product.find({})
    return products
}
exports.createProductsServices = async (data) => {
    const products = await Product.create(data)
    return products
}