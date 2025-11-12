const mongoose = require('mongoose') // import mongoose package ( mongoose ye variable hai jisme mongoose package ko import kiya hai )
// create a setting schema with 3 filelds website_title, website_logo, footer_description

const settingSchema = new mongoose.Schema({
  website_title: {
    type: String,
    required: true
  },
  website_logo: {
    type: String
  },
  footer_description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Setting', settingSchema);
// export the setting model ( jisme setting schema ko mongoose ke model me convert kiya hai )
// mongoose ke model ko use kr hoo setting naam ki collection bna rha hooo jo use kregi settingSchema
// Setting YE EK COLLECTION HAI JO DATABASE ME BAN JAYEGA
