// const Product = require('../models/Products')

const { getProductsServices, createProductsServices } = require("../services/product.services")


exports.getProducts = async (req, res, next) => {
    try {
        // const products = await Product.find({})
        const products = await getProductsServices()
        res.status(200).json({
            status: 'successs',
            data: products
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            messsage: 'cant get data',
            error: error.message
        })
    }
}

exports.createProducts = async (req, res) => {

    try { //server crash korbe na error khele

        //save or create
        //save method
        // const product = new Product(req.body)
        // const result = await product.save()

        // //create method
        // const result = await Product.create(req.body)
        const result = await createProductsServices(req.body)


        //instance creation -->do something --->save()
        // if (product.quantity === 500) {
        //     product.statas = "out od stock"
        // }
        // const result = await product.save()
        result.logger()

        res.status(200).json({
            status: "success",
            message: "Data inserted successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'data is not inserted',
            error: error.message
        })
    }

}