const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userSchema = require('../models/usersModel');
const bcrypt = require('bcrypt');

const saltRounds = 10;


const router = express.Router();

mongoose.connect('mongodb+srv://admin:PLHjk97NfPQQ6Uf3@moviesforum.9uzzwe0.mongodb.net/?retryWrites=true&w=majority');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.post('/signup', async (req,res,next) => {
    
    var hash = bcrypt.hashSync(req.body.password,saltRounds);
    var userJson = {
        username: req.body.username,
        email: req.body.email,
        region: req.body.region,
        password: hash
    }

    var user = new userSchema(userJson);
    console.log(user);
    try {
        const result = await userSchema.findOne({username:req.body.username});
        if(result == null) {
            try {
                const data = await user.save();
                console.log(data);
                {
                    res.status(200).json({
                        status: "success",
                        data: data
                    });
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            res.status(200).json({
                status: "fail",
                data: "Username already exists"
            })
        }
    } catch (error) {
      console.log(error);
    }
})

router.post('/login', async (req, res, next) => {
    

    try {
        const result = await userSchema.findOne({username: req.body.username});
        if(result == null) {
            res.status(200).json({
                status: "fail",
                data: "invalid username"
            });
        } else {
            if(bcrypt.compareSync(req.body.password, result.password))
                res.status(200).json({
                    status: "success",
                    data: result
                });
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/', (req,res,next) => {
    res.status(200).json("auth");
})

module.exports = router;