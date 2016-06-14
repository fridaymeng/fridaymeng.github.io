var express = require('express');
var app = express();
var pkg= require('./package.json');
var sitePort = 8389;

//mongo
var mongodb = require('mongodb');
var server = new mongodb.Server('localhost',27017,{auto_reconnect:true});
var db = new mongodb.Db('mydb',server,{safe:true});

db.open(function(err,db){
  if(!err)
  {
    db.collection('mycoll',{safe:true},function(err,collection){
    
      var tmp1 = {title:'hello',number:1};
    
      collection.insert(tmp1 , {safe:true}, function(err,result){
    
        console.log(result);
        res.render('index', { 
          title: 'Express', 
          tiltetest : "yingxiongqingliubu!",
          dbget: result[0]._id
        });
      }); 
    
    });
   }else{
    console.log(err);
   }
    
});

app.set('views',__dirname + '/views');
app.set('view engine', 'jade');

var pub = __dirname + '/public';
var pageTitle = pkg.name;

app.get('/',function(req,res){
	res.render('article',{
		title: pageTitle
	});
});

app.use(express.static(pub));


app.listen(sitePort,function(){
	console.log(pkg.name);
	console.log(sitePort);
})
