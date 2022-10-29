const mongoose = require('mongoose')

//schema design
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide a name for this product'],
        trim: true,
        unique: [true, "Name must be unique"],
        minLength: [3, 'name must be at least 3 charaacter'],
        mazLength: [100, 'name is too large']
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'price cant be negative']
    },
    unit: {
        type: String,
        required: true,
        enum: { //predefined value thakle enum,mane age theke define kora
            values: ['kg', 'litre', 'pcs'],
            message: 'unique value cant be{VALUE}, MUST BE kg/kitre/pcs'
        }
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, 'quantity cant be negative'],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value)
                if (isInteger) {
                    return true
                } else {
                    return false
                }
            }
        },
        message: 'quantity must be an integer'

    },
    statas: {
        type: String,
        required: true,
        enum: {
            values: ['in-stock', 'out-stock', 'discontinue'],
            message: 'statas can not be {VALUE}'
        }
    },
    // createAt:{
    //     type:Date,
    //     default:Date.now,

    // },
    // updateAt:{
    //     type:Date,
    //     default:Date.now
    // }
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    catagory: [{
        name: {
            type: String,
            required: true
        },
        _id: mongoose.Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
})


//schema middleware for saving data:pre/post
//pre works before data save and post works after data sav
productSchema.pre('save', function (next) {
    console.log('before saving data');
    //this-> refer upcoming doc
    if (this.quantity === 0) {
        this.statas = "out of stock"
    }
    next()
})
// productSchema.post('save', function (doc, next) {
//     console.log('before saving data');
//     next()
// })

//instance method--schema te kisu function dhukai dibo,jate pore bebohar korte pari

productSchema.methods.logger = function () {
    console.log(`data saved for ${this.name}`);
}




//schema-> Model-> query

//Model
const Product = mongoose.model('Product', productSchema)

module.exports = Product;