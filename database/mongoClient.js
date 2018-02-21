

  var mongoose = require('mongoose');
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:27017/samirdatabase');

  // var Todo = mongoose.model('Mdata', {
  //     text:{type: String, required:true, minLength:1, trim:true},
  //     completed:{type: Boolean, default:false},
  //     completedAt:{type: Number, default:null}
  // });
  //
  // var newTodo = new Todo({text:"     hello sam another new entry to test trimimg s working  rtghfbdgrhrtfb  rth reht erht        ", completed:true, completedAt:123});
  // newTodo.save().then((doc)=>{console.log("item saved -->"+JSON.stringify(doc , undefined, 2))}, (e)=>{console.log("unable to save ")});


  module.exports = {
      mongoose
  };
