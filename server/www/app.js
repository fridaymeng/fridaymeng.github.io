var express = require('express');
var app_pkg = require('./package.json');
var app_port = 8383;
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());
app.use(express.bodyParser());
app.set('view engine', 'jade');
var app_url = {
                       root : '/',
                 newArticle : '/newarticle',
                    aboutUs : '/aboutus',
                  articleId : '/article/:id',
              editArticleId : '/editarticle/:id',
              updateArticle : '/updatearticle',
                     theory : '/theory',
                 experiment : '/experiment',
                 philosophy : '/philosophy',
                    bigBang : '/bigbang',
                mathematics : '/mathematics',
                bigBigWorld : '/bigbigworld',
              insertArticle : '/insertarticle',
                editArticle : '/editArticle',
              deleteArticle : '/deletearticle',
             insertComments : '/insertcomments',
      deleteArticleComments : '/deletearticlecmts',
            bigBigWorldHtml : '/bigbigworldeffect',
                     master : '/master'
              };
var app_pub = __dirname + '/public';
var app_title = '物理学爱好者';

app.set('views',__dirname + '/views');

//usefulweb 
var app_use = __dirname + '/html';

//mongo
var connectMongo = require('./mongodb').ArticleProvider;
var articleProvider = new ArticleProvider('localhost', 27017);
//var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;

//physics blog

app.get("/",function(req,res){
  articleProvider.findAll( function(error,docs){
      res.render('article/index', {
           title : app_title + '+首页', 
         article : docs,
      menuActive : 0,
         showNum : req.param("pagenum") ? req.param("pagenum") : 20
      });
  })
});

//phy admin
app.get(app_url.master,function(req,res){
  var crypto = require("crypto");
  if(true){
    res.render('master/master',{
          title : app_title,
     menuActive : 0
    });
  }else{
    res.send("请注意，服务器无法响应来自遥远星球的请求!!!");
  }
});


//new article
app.get(app_url.newArticle,function(req,res){
  if(req.cookies.master && !req.cookies.admin && req.cookies.master.length === 139){
    res.render('article/newarticle',{
          title : app_title,
     menuActive : 0
    });
  }else{
    res.send("请注意，服务器无法响应来自遥远星球的请求!!!");
  }
});

//new article
app.get(app_url.aboutUs,function(req,res){
  res.render('article/aboutus',{
        title : app_title,
   menuActive : 7
  });
});

//findById
app.get(app_url.articleId,function(req,res){
  articleProvider.findById(req.params.id, function(error,docs){
      res.render('article/articlecontent', {
           title : app_title + "+" + docs.title, 
         article : docs,
      menuActive : docs.type
      });
  })
});

//insert comments
app.get(app_url.insertComments,function(req,res){
  articleProvider.addComments(req.param('_id'),{
           comments : {
                  conmentsName : req.param('conments_name'),
               conmentsContent : req.param('conments_content'),
                  conmentsTime : req.param('conments_time'),
                  conmentsCond : 1
           }
  }, function( error, docs) {
      res.send({
        notice : "success!"
      })
      return;
  });
});

//edit article
app.get(app_url.editArticleId,function(req,res){
  articleProvider.findById(req.params.id, function(error,docs){
      res.render('article/editarticle', {
           title : app_title + '+内容', 
         article : docs,
      menuActive : docs[0] ? parseInt(docs[0].type) : 0
      });
  })
});

//theory article
app.get(app_url.theory,function(req,res){
  articleProvider.findByType("01", function(error,docs){
      res.render('article/index', {
           title : app_title + '+理论物理', 
         article : docs,
      menuActive : docs[0] ? parseInt(docs[0].type) : 0,
         showNum : req.param("pagenum") ? req.param("pagenum") : 20
      });
  })
});

//experiment article
app.get(app_url.experiment,function(req,res){
  articleProvider.findByType("02", function(error,docs){
      res.render('article/index', {
           title : app_title + '+实验物理', 
         article : docs,
      menuActive : docs[0] ? parseInt(docs[0].type) : 0,
         showNum : req.param("pagenum") ? req.param("pagenum") : 20
      });
  })
});

//philosophy article
app.get(app_url.philosophy,function(req,res){
  articleProvider.findByType("03", function(error,docs){
      res.render('article/index', {
           title : app_title + '+哲学', 
         article : docs,
      menuActive : docs[0] ? parseInt(docs[0].type) : 0,
         showNum : req.param("pagenum") ? req.param("pagenum") : 20
      });
  })
});

//mathematics article
app.get(app_url.mathematics,function(req,res){
  articleProvider.findByType("06", function(error,docs){
      res.render('article/index', {
           title : app_title + '+基础数学', 
         article : docs,
      menuActive : docs[0] ? parseInt(docs[0].type) : 0,
         showNum : req.param("pagenum") ? req.param("pagenum") : 20
      });
  })
});

//bigbang article
app.get(app_url.bigBang,function(req,res){
  articleProvider.findByType("04", function(error,docs){
      res.render('article/index', {
           title : app_title + '+生活大爆炸', 
         article : docs,
      menuActive : docs[0] ? parseInt(docs[0].type) : 0,
         showNum : req.param("pagenum") ? req.param("pagenum") : 20
      });
  })
});

//bigbang article
app.get(app_url.bigBigWorld,function(req,res){
  articleProvider.findByType("05", function(error,docs){
      res.render('article/index', {
           title : app_title + '+好大个世界', 
         article : docs,
      menuActive : docs[0] ? parseInt(docs[0].type) : 0,
         showNum : req.param("pagenum") ? req.param("pagenum") : 20
      });
  })
});

app.get(app_url.editArticle,function(req,res){
  if(req.cookies.master && !req.cookies.admin && req.cookies.master.length === 139){
    articleProvider.findAll( function(error,docs){
        res.render('article/edit', {
             title : app_title + '+编辑', 
           article : docs,
        menuActive : docs[0] ? parseInt(docs[0].type) : 0
        });
    })
  }else{
    res.send("请注意，服务器无法响应来自遥远星球的请求!!!");
  }
});

app.get(app_url.deleteArticle,function(req,res){
  if(req.cookies.master && !req.cookies.admin && req.cookies.master.length === 139){
    articleProvider.deleteArticle({
              id : req.param('id')
    }, function( error, docs) {
        res.json({
          num : 1
        });
    });
  }
});

//delete comments
app.get(app_url.deleteArticleComments,function(req,res){
  articleProvider.deleteArticleComments({
            id : req.param('id'),
           num : req.param('cmnum'),
           tit : req.param('cmtit'),
       content : req.param('cmct'),
          time : req.param('cmtime'),
          cond : req.param('cmtcond')
  }, function( error, docs) {
      res.json({
        num : 1
      });
  });
});

var middleware = [];
app.post(app_url.insertArticle,function(req,res){

  articleProvider.save({
            title : req.param('title'),
         subTitle : req.param('subtitle'),
          content : req.param('content'),//req.body.content
      articleTime : req.param('time'),
             type : req.param('type'),
        timeParse : req.param('parse'),
           userIp : req.ip
  }, function( error, docs) {
      res.json({
        res : {
          things : "well"
        }
      })
      return;
  });
});

//update article
app.get(app_url.updateArticle,function(req,res){
  if(req.cookies.master && !req.cookies.admin && req.cookies.master.length === 139){
    articleProvider.update(req.param('_id'),{
              title : req.param('title'),
           subTitle : req.param('subtitle'),
            content : req.param('content'),//req.param('body')
        articleTime : req.param('time'),
               type : req.param('type'),
          timeParse : req.param('parse'),
             userIp : req.ip
    }, function( error, docs) {
        res.json({
          res : {
            things : "well"
          }
        })
        return;
    });
  }
});

/// bigbigworldeffect
app.get(app_url.bigBigWorldHtml,function(req,res){
  res.render('article/thisbigbigworld',{
        title : app_title,
   menuActive : 0
  });
});

//api tool 
var api_url = {
                          apiTool : '/apitool',
                             html : '/html',
                       javascript : '/javascript',
                              css : '/css',
                              php : '/php',
                           jquery : '/jquery',
                           python : '/python'
              };

app.get(api_url.apiTool,function(req,res){
  res.render('apitool/toolcontent');
});

app.get(api_url.html,function(req,res){
  res.render('apitool/html');
});

app.get(api_url.javascript,function(req,res){
  res.render('apitool/javascript');
});

app.get(api_url.css,function(req,res){
  res.render('apitool/css');
});

app.get(api_url.php,function(req,res){
  res.render('apitool/php');
});

app.get(api_url.jquery,function(req,res){
  res.render('apitool/jquery');
});

app.get(api_url.python,function(req,res){
  res.render('apitool/python');
});



app.use(express.static(app_pub));
app.use(express.static(app_use));


app.listen(app_port,function(){
	console.log(app_pkg.name);
	console.log(app_port);
})