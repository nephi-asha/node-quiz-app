const express = require("express")
const bcrypt = require('bcryptjs')
const router = express.Router()
const passport = require('passport')

// User model
const User = require('../models/User')

router.get('/login', (req, res) => res.render("login"))
router.get('/register', (req, res) => res.render("register"))
router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', 'You are logged out')
    res.redirect('/users/login')
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next)
 })

router.post('/register', async(req, res) => {
    const { name, email, password, password2 } = req.body
    let errors = []

    // Check required fields
    if(!name || !email || !password || !password2){
        errors.push({ msg: 'Please fill in all fields' })
    }

    if(password !== password2){
        errors.push({ msg: 'Passwords do not match' })
    }

    if(password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' })
    }

    

    if(errors.length > 0){
        console.log(req.body)
        console.log(errors)
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
         User.findOne({ email: email })
            .then(user => {
                if(user){
                    errors.push({ msg: 'Email is already registered' })
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    })
                } else {
                    const newUser =  new User({
                        name,
                        email,
                        password
                    })

                    //Hash Password
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err
                            //Set password to hashed
                            newUser.password = hash
                            // Save User
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can log in')
                                    res.redirect('/users/login')
                                })
                                .catch(err => console.log(err))

                    }))
                }
            })
        
        

    }
    
})




module.exports = router