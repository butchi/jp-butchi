
/**
 * Module dependencies.
 */

var express = require('express')
  , compass = require('node-compass')
  , routes = require('./routes')
  , http = require('http')
  , sockets = require('socket.io')
  , path = require('path');

var app = express()
  , server = http.createServer(app)
  , io = sockets.listen(server);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.locals.pretty = true;
  app.use(compass({
    mode: 'expanded',
    sass: 'sass',
    css: 'css'
  }));
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/robots.txt', function(req, res){
    res.sendfile(__dirname+ '/public/pages/robots.txt');
}); 

// redirect
app.get('/documents/analytic_signal/', function(req, res) {
  res.redirect("/documents/analytic-signal/");
});
app.get('/documents/b-thesis.html', function(req, res) {
  res.redirect("/affiliate/ku/b-thesis/");
});
app.get('/documents/d-thesis/', function(req, res) {
  res.redirect("/affiliate/ku/d-thesis/");
});
app.get('/documents/reading_seminar/', function(req, res) {
  res.redirect("/affiliate/ku/reading-seminar/");
});
app.get('/documents/tte/', function(req, res) {
  res.redirect("/affiliate/ku/tte/");
});
app.get('/documents/closynth_scanned_synthesis/', function(req, res) {
  res.redirect("/projects/closynth/closynth-scanned-synthesis/");
});
app.get('/creed.html', function(req, res) {
  res.redirect("/person/creed/");
});
app.get('/profile.html', function(req, res) {
  res.redirect("/person/profile/");
});
app.get('/people/', function(req, res) {
  res.redirect("/person/people/");
});
app.get('/documents/design/', function(req, res) {
  res.redirect("/works/design/");
});
app.get('/documents/character/', function(req, res) {
  res.redirect("/works/character/");
});
app.get('/documents/music/', function(req, res) {
  res.redirect("/works/music/");
});
app.get('/documents/poem/', function(req, res) {
  res.redirect("/works/poem/");
});
app.get('/documents/planar_binary/', function(req, res) {
  res.redirect("/butchi-number/");
});
app.get('/documents/mus85demo/', function(req, res) {
  res.redirect("/documents/publication/sigmus85/demo/");
});
app.get('/documents/mus105/', function(req, res) {
  res.redirect("/documents/publication/sigmus105/");
});
app.get('/documents/The_Labyrinth_of_Cubic_Puzzle/', function(req, res) {
  res.redirect("/affiliate/ku/cubic-puzzle/");
});
app.get('/documents/webclappad/', function(req, res) {
  res.redirect("/projects/webclappad/");
});
app.get('/documents/graphicalpad/', function(req, res) {
  res.redirect("/projects/graphicalpad/");
});
app.get('/documents/hanjukugo/', function(req, res) {
  res.redirect("/projects/hanjukugo/");
});
app.get('/documents/magic/', function(req, res) {
  res.redirect("/projects/magic/");
});
app.get('/documents/pokemon/', function(req, res) {
  res.redirect("/projects/pokemon/");
});
app.get('/documents/qr/', function(req, res) {
  res.redirect("/projects/qr/");
});
app.get('/documents/waraken/', function(req, res) {
  res.redirect("/projects/waraken/");
});

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


