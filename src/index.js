const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
var morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const route = require('./app/routes');
// const static_path = path.join(__dirname, "./routes" );
const pathview = path.join(__dirname,'./resources/views');

// var methodOverride = require('method-override')
// app.use(methodOverride('_method'))

// app.use(express.static(static_path));
app.use(express.static(pathview));    
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/public/css'));

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).json('Hello, world');
})
route(app); 

const db = require('./app/config/db/connect');

db.connect();

const port = process.env.PORT || 3000; 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

