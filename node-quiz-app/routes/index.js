const express = require("express")
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')
const  { viewPage } = require('./all')

const programming = '../data/programming'
const biology = '../data/biology'

// Welcome Page 
router.get('/', (req, res) => res.render('welcome'))

// Dashboard Page 
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {
    name: req.user.name,    
}))

const ROUTE_LIST_NAME = "quizme"
const ROUTE_INFO =  {"biology-test": "../data/biology", "programming-test": "../data/programming"}

// Quiz Page
router.get('/quizme/query/:topic', ensureAuthenticated, (req, res) => {
    for(let MY_ROUTE in ROUTE_INFO){if(req.query.search === MY_ROUTE) viewPage(req, res, ROUTE_INFO[MY_ROUTE], ROUTE_LIST_NAME)}   
})

module.exports = router