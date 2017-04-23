var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var mongoose = require('mongoose');
//var data = [{item: 'get famous'}, {item: 'do nothing'}];

//Connect to database
mongoose.connect('mongodb://test:test@ds153400.mlab.com:53400/mytodolist');
var todoSchema =  new mongoose.Schema({
  item: String
});
var Todo = mongoose.model('Todo', todoSchema);
var itemone = Todo({item: 'buy flowers'}).save(function(err){
  if(err) throw err;
  console.log('ITEM SAVED');
});

module.exports = function (app){

  app.get('/todo', function(req, res){
    Todo.find({}, function(err, data){
      if(err) throw err;
      res.render('todo', {todos: data});
    });
    //res.render('todo', {todos: data});
  });
  app.post('/todo', urlencodedParser, function(req, res){
    // data.push(req.body);
    // console.log(req.body);
    var newTodo = Todo(req.body).save(function(err, data){
      res.json(data);
    });
    //res.json(data);
  });
  app.delete('/todo/:item', function(req, res){
      Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
        if(err) throw err;
        res.json(data);
      });
    //   data = data.filter(function(todo){
    //   return todo.item.replace(/ /g, '-') !== req.params.item;
    // });
    // res.json(data);
  });
}
