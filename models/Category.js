//  create category schema with fileds namem desciption slug timestamp


const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    timestamps: { // ye automatically create ho jayega jab category create hogi
        type: Date,
        default: Date.now
    }
});

//  save se pehle validate event chalta hai isliye me yaha pre validate middleware ka use kr rha hoo
categorySchema.pre('validate', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

module.exports = mongoose.model('Category', categorySchema);

// Ye line model create kar rahi hai aur usko export kar rahi hai.

/*

🧠 Step by Step samjho:

mongoose.model('Category', categorySchema)
→ Ye MongoDB ke liye ek Model banata hai jiska naam "Category" hai.
Ye model categorySchema ke rules follow karega.

Matlab:

Ye "Category" naam ka collection use karega (MongoDB me plural ho jaata hai: categories).

Iske andar data save karte waqt ye schema ke hisaab se validate karega (name, slug, description, etc.)

Jab tum ye export karte ho:

module.exports = mongoose.model('Category', categorySchema);


to iska matlab hai:

“Main ye Category model bahar bhej raha hoon taaki doosri files me use kar sako.”

Ab doosri file (controller) me tum likhte ho:

const categoryModel = require('../models/category');


yahaan:

categoryModel sirf variable ka naam hai jisme tumne wo exported model store kiya.

Ye naam tum kuch bhi rakh sakte ho (e.g. Category, CategoryModel, catModel, etc.)

But generally log categoryModel likhte hain taaki clear rahe.


*/


