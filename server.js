var express = require('express');
var mongoose = require('mongoose');

var app = express();

var PORT = process.env.PORT || 3000;
var ShortUrl = require('./models/shortUrl');
var UrlsCount = require('./models/urlsCount');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://admin:admin@ds159497.mlab.com:59497/shorturl");

app.use(express.static(__dirname+'/public'))

//UrlsCount.collection.remove();
//ShortUrl.collection.remove();

var urlsCount = new UrlsCount();
urlsCount.count = 1;
urlsCount.name = "Counter";
urlsCount.save();



app.get('/new/*', function(req,res){
    
    var shortUrl = new ShortUrl();
   
    var url = req.params[0];
    
    
    UrlsCount.findOne({ name: 'Counter' }, function (err, doc){
        
       var count = doc.count;
         shortUrl.url = url;
         shortUrl.id = count;
        ShortUrl.findOne({ url: url }, function (err, shorty){
            if(!shorty){
                shortUrl.save(function (err){
                    if (err) {
                        return res.send("Wrong url format, make sure you have a valid protocol and real site");
                    } 
                    doc.count++;
                doc.save();
                    var str = `original_url: ${url} , short_url:"https://morning-beyond-54431.herokuapp.com/${count}`;
                res.send(str);
                });
                
            }
            else {
                 var str = `original_url: ${url} , short_url:"https://morning-beyond-54431.herokuapp.com/${shorty.id}`;
                res.send(str);
            }
        });
        
      
         
    });
    
    
});

app.get('/:id', function(req,res){
    thisId = +req.params.id;    
     ShortUrl.findOne({ id: thisId }, function (err, shorty){
         if(shorty){
            
              res.redirect(shorty.url);
         } else {
             res.send("No such route");
         }
     });
   
});

 app.listen(PORT, function () {
        console.log("Server is running on port: " + PORT);
});