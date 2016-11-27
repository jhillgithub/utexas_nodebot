var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({
	extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var routes = require('./controllers/sumo_controller.js');
app.use('/', routes);

var port = 3000;
var server = app.listen(port);

// var http = require('http');
// var server = http.createServer(app);
// server.listen(port, function() {
//   console.log('HTTP server listening on port ' + port);
// })

var sumo_api = require('./controllers/sumo_api.js');

var io = require('socket.io')(server);
io.on('connection', sumo_api.startVideo);
