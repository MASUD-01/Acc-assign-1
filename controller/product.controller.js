const Product = require('../models/Products')

const { getProductsServices, createProductsServices } = require("../services/product.services")


exports.getProducts = async (req, res, next) => {
    try {
        // const products=await Product
        // .where("name").equals(/\w/)
        // .where("quantity").gt(100).lt(600)
        // .limit(2).sort({quantity:-1})

        let filters = { ...req.query }
        //sort,page,limit--> exclude
        const excludeField = ["field", "page", "limit"]
        excludeField.forEach(field => delete filters[field])
        const queries = {}
        if (req.query.sort) {
            const sortBy = req.query.split(",").join(' ')
            queries.sortBy = sortBy
        }
        if (req.query.field) {
            const fields = req.query.fields.split(',').join(' ')
            queries.fields = fields
        }

        //for operator
        //gt, lt, gte, lte,ne
        let filtersString = JSON.stringify(filters)
        filtersString = filtersString.replace(/\b(gt|gte|lte)\b/g, match => `$${match}`)
        filters = JSON.parse(filtersString)


        //pagination
        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query
            //pagination --50products--each page 10 product
            //page 1-->1-10
            //page 2-->11-20
            //page 3-->21-30 -->page-3-->skip 1-20 -->3-1-->2*10
            //page 4-->31-40--> page-4-->skip 1-30 -->4-1-->3*10
            //page 5-->41-50

            const skip = (page - 1) * parseInt(limit)
            queries.skip = skip;
            queries.limit = parseInt(limit)
        }


        const products = await getProductsServices(filters, queries)
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

exports.updateProducts = async (req, res, next) => {

    try {
        const { id } = req.params;
        //latest update
        // const result = await Product.updateOne({ _id: id }, { $set: req.body }, {
        //     runValidators: true
        // })
        //increamet product price
        const result = await Product.updateOne({ _id: id }, { $inc: req.body }, {
            runValidators: true
        })

        //before update-agee id diye get kori tarpor update
        // const product = await Product.findById(id)
        // const result = await product.set(req.body).save()

        res.status(200).json({
            status: "success",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'couldnt update product',
            error: error.message
        })
    }
}
exports.bulkUpdateProducts = async (req, res, next) => {
    const { ids, body } = req.body

    try {

        //onek product update ekoi price
        // const result = await Product.updateMany({ _id: req.body.ids }, req.body.data, {
        //     runValidators: true
        // })
        //onek product update vinno price
        const products = []
        ids.forEach(product => {
            products.push(Product.updateOne({ _id: product.id }, product.data))
        })
        const result = await Promise.all(products)
        console.log(result)

        res.status(200).json({
            status: "success",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'couldnt update product',
            error: error.message
        })
    }
}
exports.deleteProductById = async (req, res, next) => {
    const { id } = req.params

    try {
        const result = await Product.deleteOne({ _id: id })

        if (!result.deletedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Couldnt delete the product"
            })
        }

        res.status(200).json({
            status: "success",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'couldnt delete product',
            error: error.message
        })
    }
}

exports.bulkDeleteProducts = async (req, res, next) => {
    // const { ids } = req.body

    try {
        const result = await Product.deleteMany({ _id: req.body.ids })

        res.status(200).json({
            status: "success",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'couldnt deleted given product',
            error: error.message
        })
    }
}