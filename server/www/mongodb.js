var Db = require('mongodb').Db;
h -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"ar Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

ArticleProvider = function(host, port) {

  this.db= new Db('article', new Server(host, port, {auto_reconnect: true}, {safe:true}));
  this.db.open(function(){});

};

//poem start
ArticleProvider.prototype.getPoetry= function(callback) {

  this.db.collection('poetry', function(error, poem_collection) {
    if( error ) callback(error);
    else callback(null, poem_collection);
  });

};

//save
ArticleProvider.prototype.savePoem = function(poems,callback) {
    this.getPoetry(function(error, poem_collection) {
      if( error ) callback(error)
      else {
        poem_collection.insert(poems,function() {
          callback(null,poems);
        });
      }
    });
    
};

//update poem

ArticleProvider.prototype.updatePoem = function(id,poems, callback) {

    this.getPoetry(function(error, poem_collection) {
      if( error ) callback(error)
      else {
        poem_collection.update({_id: poem_collection.db.bson_serializer.ObjectID.createFromHexString(id)},poems, function(error, result) {
          if( error ) callback(error)
          else callback(null, poems)
        },0,1);
      }
    });

};

//delete poem
ArticleProvider.prototype.deletePoem = function(id, callback) {

    this.getPoetry(function(error, poem_collection) {
      if( error ) callback(error)
      else {
        
        idPram = {_id : poem_collection.db.bson_serializer.ObjectID.createFromHexString(id.id)};

        poem_collection.remove(idPram, function() {
          callback(null, idPram);
        });
      }
    });
    
};

//findAll poem
ArticleProvider.prototype.findAllPoem = function(callback) {

    this.getPoetry(function(error, poem_collection) {
      if( error ) callback(error)
      else {
        poem_collection.find().sort({ '_id' : -1 }).toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });

};

//findById

ArticleProvider.prototype.findPoemById = function(id, callback) {

    this.getPoetry(function(error, poem_collection) {
      if( error ) callback(error)
      else {
        poem_collection.findOne({_id: poem_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
          if( error ) callback(error)
          else callback(null, result)
        });
      }
    });

};

//poem end

//getCollection

ArticleProvider.prototype.getCollection= function(callback) {

  this.db.collection('bloglist', function(error, article_collection) {
    if( error ) callback(error);
    else callback(null, article_collection);
  });

};

//findAll
ArticleProvider.prototype.findAll = function(callback) {

    this.getCollection(function(error, article_collection) {
      if( error ) callback(error)
      else {
        article_collection.find().sort({ '_id' : -1 }).toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });

};

//find by type
ArticleProvider.prototype.findByType = function(typeID,callback) {

    this.getCollection(function(error, article_collection) {
      if( error ) callback(error)
      else {
        article_collection.find({type : typeID}).sort({ '_id' : -1 }).toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });

};

//findById

ArticleProvider.prototype.findById = function(id, callback) {

    this.getCollection(function(error, article_collection) {
      if( error ) callback(error)
      else {
        article_collection.findOne({_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
          if( error ) callback(error)
          else callback(null, result)
        });
      }
    });

};

//update article

ArticleProvider.prototype.update = function(id,articles, callback) {

    this.getCollection(function(error, article_collection) {
      if( error ) callback(error)
      else {
        article_collection.update({_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(id)},articles, function(error, result) {
          if( error ) callback(error)
          else callback(null, articles)
        },0,1);
      }
    });

};

//add comments

ArticleProvider.prototype.addComments = function(id,comments, callback) {

    this.getCollection(function(error, article_collection) {
      if( error ) callback(error)
      else {
        article_collection.update({_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(id)},{$push : comments}, function(error, result) {
          if( error ) callback(error)
          else callback(null, comments)
        },0,1);
      }
    });

};

//save
ArticleProvider.prototype.save = function(articles, callback) {

    this.getCollection(function(error, article_collection) {
      if( error ) callback(error)
      else {
        /*if( typeof(articles.length)=="undefined")
          articles = [articles];

        for( var i =0;i< articles.length;i++ ) {
          article = articles[i];
          article.created_at = new Date();
          if( article.comments === undefined ) article.comments = [];
          for(var j =0;j< article.comments.length; j++) {
            article.comments[j].created_at = new Date();
          }
        }*/

        article_collection.insert(articles, function() {
          callback(null, articles);
        });
      }
    });
    
};

//delete
ArticleProvider.prototype.deleteArticle = function(id, callback) {

    this.getCollection(function(error, article_collection) {
      if( error ) callback(error)
      else {
        
        idPram = {_id : article_collection.db.bson_serializer.ObjectID.createFromHexString(id.id)};

        article_collection.remove(idPram, function() {
          callback(null, idPram);
        });
      }
    });
    
};

//delete comments
ArticleProvider.prototype.deleteArticleComments = function(cmts, callback) {

    this.getCollection(function(error, article_collection) {
      if( error ) callback(error)
      else {
        var cmts_num = parseInt(cmts.num);
        var cmts_tit = cmts.tit;
        var cmts_ct = cmts.content;
        var cmts_time = cmts.time;
        var cmts_cond = cmts.cond;
        var cmtsObj = {
          'conmentsName' : cmts_tit,
       'conmentsContent' : cmts_ct,
          'conmentsTime' : cmts_time,
          'conmentsCond' : cmts_cond
        }
        article_collection.update({_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(cmts.id)},{$pop:{ comments: 1 }}, function(error, result) {
                        if( error ) callback(error)
                        else 
                          callback(null)
                      },0,1);
      }
    });
    
};

exports.ArticleProvider = ArticleProvider;
