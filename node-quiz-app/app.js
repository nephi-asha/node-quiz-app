const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

const app = express()

//Passport config
require('./config/passport')(passport)

// DB Config
const db = require('./config/keys').MongoURI

mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

//
app.use(expressLayouts)
app.set('view engine', 'ejs')

//BodyParse
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Express Session
app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Connect Flash
app.use(flash())

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error= req.flash('error')
    next()
})

//Public Folder
app.use('/public', express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use((req, res) => {
    res.send("resource not found")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
