const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

//schema design
const stockSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        required: true,
        ref: 'Product'
    },
    name: {
        type: String,
        required: [true, 'please provide a name for this product'],
        trim: true,
        unique: [true, "Name must be unique"],
        lowercase: true,
        minLength: [3, 'name must be at least 3 charaacter'],
        mazLength: [100, 'name is too large']
    },
    description: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
        enum: { //predefined value thakle enum,mane age theke define kora
            values: ['kg', 'litre', 'pcs', 'bag'],
            message: 'unit value cant be{VALUE}, MUST BE kg/kitre/pcs'
        }
    },
    imageUrl: [{
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                if (!Array.isArray(value)) {
                    return false;
                }
                let isValid = true;
                value.forEach(url => {
                    if (!validator.isURL(url)) {
                        isValid = false;
                    }
                });
                return isValid;
            }
        }
    }],
    price: {
        type: Number,
        required: true,
        min: [0, "product price cant be negative"]
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "product quantity cant be negative"]
    },
    catagory: {
        type: String,
        required: true,
    },
    brand: {
        name: {
            type: String,
            required: true,
        },
        id: {
            type: ObjectId,
            ref: 'Brand',
            required: true,
        }
    },
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
    }],
    status: {
        type: ObjectId,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "status cant be {VALUE}"
        },
    },
    store: {
        name: {
            type: String,
            trim: true,
            required: [true, "please provide a store name"],
            lowercase: true,
            enum: {
                values: ["dhaka", "chattaogram", "rajshahi", "sylhet", "khulna", "barishal", "rangpur", "mymensing"],
                message: "{VALUE} is not a valid name"
            }
        },
        id: {
            type: ObjectId,
            required: true,
            ref: 'Store'
        }
    },
    suppliedBy: {
        name: {
            type: String,
            trim: true,
            required: [true, "please provide a supplier name"],
        },
        id: {
            type: ObjectId,
            ref: 'Supplier'
        }
    }
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

//schema-> Model-> query

//Model
const Stock = mongoose.model('Stock', stockSchema)

module.exports = Stock;