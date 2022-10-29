const { createBrandService, getBrandService, getBrandByIdService } = require("../services/brandService")

exports.createBrand = async (req, res, next) => {

    try {
        const result = await createBrandService(req.body)
        res.status(200).json({
            status: "Success",
            message: "Successfully created the brand",
            data: result,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: "Coudnt create the brand"
        })
    }
}
exports.getBrand = async (req, res, next) => {

    try {
        const result = await getBrandService(req.body)
        res.status(200).json({
            status: "Success",
            message: "Successfully get the brand",
            data: result,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: "Coudnt find the brand"
        })
    }
}

exports.getBrandById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await getBrandByIdService(id)
        if (!result) {
            return res.status(400).josn({
                status: "fail",
                error: "Coudnt find the brand "
            })
        }
        res.status(200).json({
            status: "Success",
            message: "Successfully get the brand",
            data: result,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: "Coudnt find the brand"
        })
    }
}
exports.updateBrand = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await updateBrandByIdService(id, req.body)
        if (!result.nModified) {
            return res.status(400).josn({
                status: "fail",
                error: "upate the brand "
            })
        }
        res.status(200).json({
            status: "Success",
            message: "Successfully upate the brand",
            data: result,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: "Coudnt update the brand"
        })
    }
}