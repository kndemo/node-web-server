const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('screamIt', (text) => text.toUpperCase() ); 

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log); 
    fs.appendFile('newStore.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to newStore.log');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>'); 
    // res.send({
    //     name: 'Kevin',
    //     likes: [
    //         'biking',
    //         'travelling'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        welcomeNote: 'Welcome to the Home Page'
    });
});

app.get('/about', (req, res) => {
    //res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill this request'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});