const fs = require('fs');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const port = process.env.PORT  || 3000;

const data = require('./data');
const app = express();


// set template engine
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// mount static file route
app.use(express.static('./public'));


// load middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use((req, res, next) => {
    let log = `${req.method}  -> ${req.url} - ${new Date().toDateString()}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Error writing log ' + err);
        }
    });
    console.log(log);
    next();
});


app.use(cors()); // for cors

// register some template helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});



// Controllers
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Welcome to our site'
    });
});
  
app.get('/about', (req, res) => {

    res.render('about.hbs', {
        pageTitle: 'About us'
    });
});

app.get('/contact', (req, res) => {

    render('contact.hbs', {pageTitle: 'Contact us'});
});




// start server
app.listen(port,  () => console.log(`Server running on ${port}`));


// we may need this for testing
module.exports = app;
