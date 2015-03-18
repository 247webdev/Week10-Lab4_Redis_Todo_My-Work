var express = require("express"),
    app = express(),
    redis = require("redis"),
    client = redis.createClient(),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser");

// connect the middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// If I want to include static files like css/js/images
app.use(express.static(__dirname + '/public'));

// root route
app.get('/', function(req, res){
  client.LRANGE("todolist", 0, -1, function(err, todos){
    res.render("index", {todos: todos});
  });
});

// post route
app.post('/create', function(req, res){
  console.log("In create", req.body);
  // LPUSH  do some creating
  client.LPUSH("todolist", req.body.task);
  res.redirect("/");  // redirects are to routes while renders are to views

});

// start the server
app.listen(3000, function(){
  console.log("Sever starting on port 3000");
});