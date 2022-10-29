const Brand = require('../models/Brand')

exports.createBrandService = async (data) => {
    const result = await Brand.create(data)
    return result;
}
exports.getBrandService = async () => {
    const result = await Brand.find({}).select('-product -suppliers')
    return result;
}
exports.getBrandByIdService = async (id) => {
    const result = await Brand.find({ _id: id })
    return result;
}
exports.updateBrandByIdService = async (id, data) => {
    const result = await Brand.updateOne({ _id: id }, data, {
        runValidators: true
    })
    return result;
}