const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const movieSchema = require('../models/movieModel');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.post('/save', async (req, res, next) => {
    var movie = new movieSchema(req.body);
    try {
        const result = await movieSchema.findOne({name: req.body.name})
        if(result == null) {
            try {
                const result = await movie.save()
                res.status(200).json({
                    status: "success",
                    data: result
                })
            } catch(error) {
                console.log(error);
            }
        } else {
            res.status(200).json({
                status: "fail",
                data: "movie already exists"
            })
        }
    } catch(error) {
        console.log(error);
    }
})

router.post('/load', async (req, res, next) => {
    try {
        const result = await movieSchema.findOne({name: req.body.name})
        res.status(200).json({
            status: "success",
            data: result
        })
    } catch (error) {
        console.log(error);
    }
})

router.post('/update',async (req,res,next)=>{
    console.log("Inside Update",req.body)
    try {
        const result = await movieSchema.updateOne({name:req.body.name},{comments: req.body.comments})
        res.status(200).json({
            status: "succes",
            data: result
        })
    } catch(error) {
        console.log(error);
    }
//    await getmovie.update({nameofthemovie:req.body.nameofthemovie},{$push: {commentofthemovie: req.body.commentofthemovie}});
});


router.get('/', (req, res, next) => {
    res.status(200).json("movies")
})

module.exports = router;