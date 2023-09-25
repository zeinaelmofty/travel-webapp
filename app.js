const express = require("express");
const PORT = process.env.PORT || 3030;

const cookieParser = require('cookie-parser');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
const { Double } = require('mongodb');
const { consumers } = require('stream');
var curruser="";

app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));  
app.use(bodyParser.json());
app.use(cookieParser());



var MongoClient = require('mongodb').MongoClient
var username="";

app.post('/login', (req,res) =>{
  
  
    var name= req.body.username
    var pass=req.body.password

    if (name=="admin" && pass == "admin"){
      res.render('Home');
      return;
    }
   else { 
      MongoClient.connect("mongodb://localhost:27017/Networks", async function(err,client){
      if(err) throw err
      var db = client.db('myDB');
      var record = await db.collection('myCollection').findOne({username : name , password : pass});
      if(record != null){
      username = record.username;
      res.render('Home')
      return;
    }
  
    
    
    
  
    else{
      var msg="User not registered"
      res.render('error',{msg})
      return;
    }
  }
      )
  }

}
)
;

app.post('/register',  (req,res) =>{
  MongoClient.connect("mongodb://localhost:27017/Networks", async function(err,client){
    if(err) throw err
    var db = client.db('myDB');
    var name= req.body.username

    
    var pass=req.body.password
    var userexist = await db.collection('myCollection').findOne({username : name , password : pass});
    if (Object.keys(name).length === 0){
      var msg="You did not type username please go back and try again"
      res.render('error',{msg})
      return;
    }
    else  if (Object.keys(pass).length === 0){
      var msg="You did not type password please go back and try again"
      res.render('error',{msg})
      return;
    }

    else if(userexist!=null){
      var msg="This user already exists"
      res.render('error',{msg})
      return;
    } 
    else{
      var golist=[]
    var usernew = await db.collection('myCollection').insertOne({username : name , password : pass, wantTo: golist});
    res.redirect('/login')
  return; }
    
}) ;

});



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('login')
});

app.get('/login', function(req, res){
  res.render('login')
});

app.get('/home',function(req,res){
  res.render('home')
}); 

app.get('/registration', function(req, res){
  res.render('registration')
});


app.get('/wanttogo',function(req,res){
  res.render('wanttogo')
});

app.get('/hiking',function(req,res){
  res.render('hiking')
});

app.get('/cities',function(req,res){
  res.render('cities')
});

app.get('/islands',function(req,res){
  res.render('islands')
});

app.get('/inca',function(req,res){
  res.render('inca')
});

app.get('/annapurna',function(req,res){
  res.render('annapurna')
});

app.get('/islands',function(req,res){
  res.render('islands')
});

app.get('/paris',function(req,res){
  res.render('paris')
});

app.get('/rome',function(req,res){
  res.render('rome')
});

app.get('/bali',function(req,res){
  res.render('bali')
});

app.get('/santorini',function(req,res){
  res.render('santorini')
});

app.post('/wanttogo',async(req,res) =>{
  var dest= [];
  MongoClient.connect("mongodb://localhost:27017/Networks", async function(err,client){
    if(err) throw err
    var db = client.db('myDB');
    var result = db.collection("myCollection").find({}).toArray(function(err,result){
      if (err) throw err;
      db.close;
    
    for(let y=0;y<(result).length;y++){
      console.log(result[y].username);
      if(username==result[y].username)
      {
      var goList=result[y].wantTo; 

  for (let i = 0; i < goList.length; i++) {
  dest.push(goList[i])
}
}}
console.log(dest);
res.render('wanttogo',{dest});
}) ;

})});

app.post('/inca', (req,res) =>{
  MongoClient.connect("mongodb://localhost:27017/Networks", async function(err,client){
    if(err) throw err
    var db = client.db('myDB');
    var result = db.collection("myCollection").find({}).toArray(function(err,result){
      if (err) throw err;
      console.log(result);
      db.close;
      var user=username.toArray;
    var flag="false";
    console.log(result);
    console.log(goList);
    for(let y=0;y<(result).length;y++){
      console.log(result[y].username);
      if(username==result[y].username)
      {
      var goList=result[y].wantTo;
      for (let i = 0; i < goList.length; i++) {
        if(goList[i]=="Inca"){
          flag="true";
        }
      }
    }}
    
      if (flag=="true"){
        var msg="This destination is already in the list"
      res.render('error',{msg})
      return;
      }
      else{
        db.collection("myCollection").update({},{$push:{wantTo:"Inca"}})
      }
    
  return; });
})});



app.post('/annapurna', (req,res) =>{
  MongoClient.connect("mongodb://localhost:27017/Networks", async function(err,client){
    if(err) throw err
    var db = client.db('myDB');
    var result = db.collection("myCollection").find({}).toArray(function(err,result){
      if (err) throw err;
      console.log(result);
      db.close;
      var user=username.toArray;
    var flag="false";
    console.log(result);
    console.log(goList);
    for(let y=0;y<(result).length;y++){
      console.log(result[y].username);
      if(username==result[y].username)
      {
      var goList=result[y].wantTo;
      for (let i = 0; i < goList.length; i++) {
        if(goList[i]=="annapurna"){
          flag="true";
        }
      }
    }}
    
      if (flag=="true"){
        var msg="This destination is already in the list"
      res.render('error',{msg})
      return;
      }
      else{
        db.collection("myCollection").update({},{$push:{wantTo:"annapurna"}})
      }
    
  return; });
})});


app.post('/bali', (req,res) =>{
  MongoClient.connect("mongodb://localhost:27017/Networks", async function(err,client){
    if(err) throw err
    var db = client.db('myDB');
    var result = db.collection("myCollection").find({}).toArray(function(err,result){
      if (err) throw err;
      console.log(result);
      db.close;
      var user=username.toArray;
    var flag="false";
    console.log(result);
    console.log(goList);
    for(let y=0;y<(result).length;y++){
      console.log(result[y].username);
      if(username==result[y].username)
      {
      var goList=result[y].wantTo;
      for (let i = 0; i < goList.length; i++) {
        if(goList[i]=="bali"){
          flag="true";
        }
      }
    }}
    
      if (flag=="true"){
        var msg="This destination is already in the list"
      res.render('error',{msg})
      return;
      }
      else{
        db.collection("myCollection").update({},{$push:{wantTo:"bali"}})
      }
    
  return; });
})});

app.post('/santorini', (req,res) =>{
  MongoClient.connect("mongodb://localhost:27017/Networks", async function(err,client){
    if(err) throw err
    var db = client.db('myDB');
    var result = db.collection("myCollection").find({}).toArray(function(err,result){
      if (err) throw err;
      console.log(result);
      db.close;
      var user=username.toArray;
    var flag="false";
    console.log(result);
    console.log(goList);
    for(let y=0;y<(result).length;y++){
      console.log(result[y].username);
      if(username==result[y].username)
      {
      var goList=result[y].wantTo;
      for (let i = 0; i < goList.length; i++) {
        if(goList[i]=="santorini"){
          flag="true";
        }
      }
    }}
    
      if (flag=="true"){
        var msg="This destination is already in the list"
      res.render('error',{msg})
      return;
      }
      else{
        db.collection("myCollection").update({},{$push:{wantTo:"santorini"}})
      }
    
  return; });
})});

app.post('/paris', (req,res) =>{
  MongoClient.connect("mongodb://localhost:27017/Networks", async function(err,client){
    if(err) throw err
    var db = client.db('myDB');
    var result = db.collection("myCollection").find({}).toArray(function(err,result){
      if (err) throw err;
      console.log(result);
      db.close;
      var user=username.toArray;
    var flag="false";
    console.log(result);
    console.log(goList);
    for(let y=0;y<(result).length;y++){
      console.log(result[y].username);
      if(username==result[y].username)
      {
      var goList=result[y].wantTo;
      for (let i = 0; i < goList.length; i++) {
        if(goList[i]=="paris"){
          flag="true";
        }
      }
    }}
    
      if (flag=="true"){
        var msg="This destination is already in the list"
      res.render('error',{msg})
      return;
      }
      else{
        db.collection("myCollection").update({},{$push:{wantTo:"paris"}})
      }
    
  return; });
})});


app.post('/rome', (req,res) =>{
  MongoClient.connect("mongodb://localhost:27017/Networks", async function(err,client){
    if(err) throw err
    var db = client.db('myDB');
    var result = db.collection("myCollection").find({}).toArray(function(err,result){
      if (err) throw err;
      console.log(result);
      db.close;
      var user=username.toArray;
    var flag="false";
    console.log(result);
    console.log(goList);
    for(let y=0;y<(result).length;y++){
      console.log(result[y].username);
      if(username==result[y].username)
      {
      var goList=result[y].wantTo;
      for (let i = 0; i < goList.length; i++) {
        if(goList[i]=="rome"){
          flag="true";
        }
      }
    }}
    
      if (flag=="true"){
        var msg="This destination is already in the list"
      res.render('error',{msg})
      return;
      }
      else{
        db.collection("myCollection").update({},{$push:{wantTo:"rome"}})
      }
    
  return; });
})});


app.post('/search',function(req,res){
  const searchVAL= req.body.Search
  console.log(searchVAL)

  const dest= ["annapurna", "rome", "bali", "paris", "santorini","inca"];
  const result = new Array("","","","","","");
  const p =new Array("","","","","","");
  for(let i=0;i<dest.length;i++)
  {
    
    if(dest[i].toLowerCase().includes(searchVAL))
      {
        result[i]=dest[i];
      }
      else{
        result[i]="";
      }

  }
  for(let i=0;i<p.length;i++)
  {
    if(result[i].toLowerCase().includes("paris"))
    {
      p[i]="paris"
    }
    else if(result[i].toLowerCase().includes("bali"))
    {
      p[i]="bali"
    }
    else if(result[i].toLowerCase().includes("rome"))
{
  p[i]="rome"

}
else if(result[i].toLowerCase().includes("santorini"))
{
  p[i]="santorini"
}
else if(result[i].toLowerCase().includes("inca"))
    {
      p[i]="inca"
    }
    else if(result[i].toLowerCase().includes("annapurna"))
    {
      p[i]="annapurna"
    }
    else{
    p[i]=""
    }
  }
  res.render("searchresults",{
    p1:p[0],m1:result[0],
    p2:p[1],m2:result[1],
    p3:p[2],m3:result[2],
    p4:p[3],m4:result[3],
    p5:p[4],m5:result[4],
    p6:p[5],m6:result[5]
  })


  
});


app.listen(3000);
