const express = require('express')
const router = express.Router();

router.get('/', function (req, res) {
    res.render('index.html', { title: 'Hey', message: 'Hello there!'});
});

router.get('/home', function (req, res, next) {
    res.render('home', {
        title: 'home',
        message: 'home msg'
    })
})

module.exports = router