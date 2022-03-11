const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const { findOne } = require("../models/User.js");

//register
router.get("/register", async (req,res)=>{
    const user = await new User({
        username: "kanak",
        email: "kanak@gmail.com",
        password: "123456"
    })
    await user.save();
    res.send("ok");
});

router.post("/register", async (req,res)=>{
    try{
        // salting pswd
        const salt = await bcrypt.genSalt(11);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        
        //save user and return status
        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//login
router.post("/login", async (req,res)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).send("user not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Invalid password");

        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;