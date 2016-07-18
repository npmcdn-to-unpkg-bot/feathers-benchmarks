const feathers = require('feathers');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const hooks = require('feathers-hooks');
const memory = require('feathers-memory');
const bodyParser = require('body-parser');
const path = require('path');
const handler = require('feathers-errors/handler');

// A Feathers app is the same as an Express app
const app = feathers();

// Parse HTTP JSON bodies
app.use(bodyParser.json());
// Parse URL-encoded params
app.use(bodyParser.urlencoded({ extended: true }));
// Register hooks module
app.configure(hooks());
// Add REST API support
app.configure(rest());
// Configure Socket.io real-time APIs
app.configure(socketio());
// Register our memory "users" service
app.use('/messages', memory());
// Host the `public/` folder
app.use('/', feathers.static(path.join(__dirname, 'public')));
// Register a nicer error handler than the default Express one
app.use(handler());

// Start the server
const port = process.env.PORT || 3030;

const server = app.listen(port);

server.on('listening', () => console.log(`App listening on port ${port}`));
