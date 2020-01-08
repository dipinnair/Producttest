var express=require('express')
var mongoose =require('mongoose')
var bodyParser=require('body-parser')


const Productmodel=mongoose.model("productdetails",

{
    pname:String,
    itemcode:String,
    quality:String,
    sname:String,
    price:String
    


}
)
mongoose.connect("mongodb+srv://dipinforce:forcepandalam@cluster0-sspts.mongodb.net/test?retryWrites=true&w=majority")


 var app=express();

 app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

// For CORS,Pgm Line no 12 to 29
    app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*' );

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.get('/',(req,res)=>{
res.send('hello');
});

app.post('/Product',function(req,res){

 var pname=req.body.pname
 var itemcode=req.body.itemcode
 var quality=req.body.quality
 var sname=req.body.sname
 var price=req.body.price
 

   var Product=new Productmodel(req.body)

   Product.save( (error,data)=>{
       if(error){
           throw error;
       }
           else{
               res.send(data);
       }
    })
})

app.get('/viewall',(req,res)=>{

var result=Productmodel.find( (error,data)=>{
     if(error){
     throw error;
     }
     else{
         res.send(data);
     }
    })
    })

app.post('/update',(req,res)=>{
var pname=req.body.pname;
var itemcode=req.body.itemcode;
var quality=req.body.quality;
var sname=req.body.sname;
var price=req.body.price;
var result=Productmodel.findByIdAndUpdate(id,{"pname":pname,"itemcode":itemcode,"quality":quality,"sname":sname,"price":price},(error,data)=>{

    if(error){
        throw error;
} 
else{
    res.send("succesfully Updated" + data);
}
})
})
app.post('/remove',(req,res)=>{

    
    var result=Productmodel.findByIdAndRemove( id,(error,data)=>{
        if(error){
            newFunction(error)
        }
        else{
            res.send("succesfully removed" + data);
        }
    })
})
app.post('/search',(req,res)=>{
    var itemcode=req.body.itemcode;
    var result=Productmodel.find({"itemcode":itemcode},(error,data)=>{
if(error){
    throw error;
}
else{

res.send("succesfully searched" + data);
}
    })
})


app.listen(process.env.PORT || 3000,()=>{
    console.log('server started')
})

