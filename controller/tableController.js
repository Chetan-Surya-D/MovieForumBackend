const express = require("express");
const bodyParser = require('body-parser');
const movieNameSchema = require("../models/commentModel");
const mongoose = require("mongoose");

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.post('/save', async (req, res, next) => {
    var movie = new movieNameSchema(req.body);
    console.log(movie);
    try {
        const result = await movieNameSchema.findOne({name:req.body.name})
        if(result == null) {
            try {
                const result = await movie.save()
                console.log(result);
                res.status(200).json({
                    status: "success",
                    data: result
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            res.status(200).json({
                status: "fail",
                data: "Movie already exists"
            })
        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/load', async (req, res, next) => {
    console.log("Inside load");
    try {
        const result = await movieNameSchema.find()
        // console.log(result)
        res.status(200).json({
            status: "success",
            data: result
        })
    } catch (error) {
        console.log(error);
    }
    console.log("data sent");
})

module.exports = router;