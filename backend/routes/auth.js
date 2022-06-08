const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'secretMuhammadHamzaKhattakFromKarakoram';


//Route 1: create a user using POST method: "/api/auth/createuser" no login required
router.post('/createuser',[
    body('name', 'Name must be atleast 3 letters').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter correct password').isLength({ min: 3 }),
], async(req, res) => {
    let success = false;
    //if there is an error, return the bad request status code and the error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //if there is error and same user email, then show error message
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: 'User already exists' });
        }
        // hashing password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);

        //create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword,
          })

        //create a jwttoken
        const data = {
            id: user._id
        }
        const token = jwt.sign(data, JWT_SECRET)
        console.log(token);
        //send the token to the user
        success = true;
        res.status(200).json({ success, token });

        // res.json(user);
    } 
    catch (error) {
        console.log(error.message);
        res.status(500).send('Some Error occured');
    }
  
});


//Route 2: authenticate a user using POST method: "/api/auth/login" no login required
router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
], async(req, res) => {
    let success = false;
    //if there is an error, return the bad request status code and the error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //if there is error and same user email and password, then show error message
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });    
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: 'User does not exist' });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: 'User does not exist' });
        }
        const data = {
            id: user._id
        }
        const token = jwt.sign(data, JWT_SECRET);
        success = true;
        console.log(token);
        res.status(200).json({ success, token });
    } 
    catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});


//Route 3: Get login user details using POST method: "/api/auth/getuser": login required
router.post('/getuser', fetchuser, async(req, res) => {
    try {
        let user = await User.findById(req.user.id);
        res.json(user);
    } 
    catch (error) {
        console.log(error.message);
        res.status(500).send({error: 'Internal Server Error'});
    }
});
module.exports = router;