const mongoose = require('mongoose');

const movieNameSchema = mongoose.Schema({
    name: {type: String, required: true}
});

module.exports = mongoose.model("MovieNames",movieNameSchema);