const mongoose = require('mongoose');
// const commentSchema = require('./commentModel')

const commentSchema = mongoose.Schema({
    username: {type: String, required: true},
    // rating: {type: Number, required: true},
    comment: {type: String, required: false}
})

const movieSchema = mongoose.Schema({
    name: {type: String, required: true},
    genre: {type: String, required: true},
    tlink: {type: String, required: true},
    ilink: {type: String, required: true},
    description: {type: String, required: true},
    comments: {type: [commentSchema], required: false}
})

module.exports = mongoose.model("movies", movieSchema);