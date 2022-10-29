const Product = require('../models/Products');

exports.getProductsServices = async (filter, queries) => {
    const products = await Product.find(filter)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)

    //pagimation
    const totalProduct = await Product.countDocuments(filter)
    const pageCount = Math.ceil(totalProduct / queries.limit)
    return { totalProduct, pageCount, products }
}
exports.createProductsServices = async (data) => {
    const products = await Product.create(data)
    return products
}