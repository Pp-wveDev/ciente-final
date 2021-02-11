const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const cookieParser = require("cookie-parser");
const expressSession = require('express-session');
const cloudinary = require('cloudinary').v2;
const fileupload = require('express-fileupload');

const port = process.env.PORT || 3000;

// Iniciamos aplicación
var app = express();

// Posts como json
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(express.json());

app.use(cookieParser());
app.use(expressSession({
    secret: 'pineapple_pizza',
    resave: true,
    saveUninitialized: true
}));

// Cloudinary
cloudinary.config({
    cloud_name: process.env.cloud_name || "hvbvm1f5a",
    api_key: process.env.cloud_api_key || "185769185322962",
    api_secret: process.env.cloud_api_secret || "nd1kuI2-joDl-UnaRN419n6LLGI" 
})
app.use(fileupload({
    useTempFiles: true
}));


// Establecemos vista predeterminada
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts/'
}));
app.set('view engine', 'hbs');

// Encendemos server
app.listen(port, () => {
    console.log('Express server started at port: 3000');
});

// Controladores
const loginControler = require('./controllers/loginController');
const inicioController = require('./controllers/inicioController');
const detallesController = require('./controllers/detallesController');
const mensajesController = require('./controllers/mensajesController');

// Registramos rutas
app.use('/', loginControler);
app.use('/principal', inicioController);
app.use('/details', detallesController);
app.use('/', mensajesController);