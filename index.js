const express=require('express')
const bodyParser=require('body-parser')
const app=express()

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

app.set('view engine',"ejs");

app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post('/',function(req,res){
    console.log(req.body);
    var spawn = require("child_process").spawn;
    var process = spawn('python',["./kmap_project.py", 
    req.body.List_1, 
    req.body.List_X] ); 
    process.stdout.on('data', function(data) { 
        console.log(data.toString());
        res.render('list',{Answer:data.toString()}); 
    } ) 
})

app.listen(process.env.PORT||3000,function(){
    console.log("Server is ready to serve at location 3000");
})