//import modules
import 'dotenv/config';
import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import flash from "connect-flash";
import session from "express-session";
import pgPromise from "pg-promise";

//routes
import add from './routes/add.js';
import refuel from './routes/refuel.js';
import all from "./routes/vehicles.js";

//database queries
import FuelConsumption from './fuel-consumption.js';


//pg promise
const pgp = pgPromise();


//SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

// Database connection
const connectionString = process.env.DATABASE_URL;
const database = pgp(connectionString);


//database instamce
const database_instance = FuelConsumption(database);

//route instances
const home_route = all(database_instance)
const add_car = add(database_instance)
const refuel_car = refuel(database_instance)

const app = express();

//middleware configuration

//session
app.use(
    session({
        secret: "expenses tracker web app",
        resave: false,
        saveUninitialized: true,
    })
);
//flash for flash messages
app.use(flash());
//handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
//styling
app.use(express.static("public"));
//bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//enables flash messages to display on screen and keeps working asfterwards with  the next function
app.use(function (req, res, next) {
    res.locals.messages = req.flash();
    next();
});


//routes

//home route for all vehicles
app.get('/', home_route.list_of_vehicles);

//get and post routes for adding car
app.get('/add', add_car.get_add_car);
app.post('/add', add_car.post_add_car);

//get and post routes for refueling car
app.get('/refuel', refuel_car.get_refuel);
app.post('/refuel/', refuel_car.post_refuel);

  
// Start the server
const PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
    console.log("App started at port:", PORT);
});

