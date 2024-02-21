const mysql=require('mysql');
const express=require('express');
const bodyParser = require('body-parser');
const cors=require("cors");
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'10xguhan',
    database:'tinydb',


})
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

db.connect((err)=>{
    if(err){
        console.log("failed");
    }
    else{
        console.log("connected");
    }
})

const app=express();
const port=3000;

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cors({ origin: 'http://localhost:5173' }));
app.post('/api/sql-save',(req,res)=>{
    if(req){
        console.log("received");
    }
   const {employeeName,employeeId,department,dob,gender,designation,salary}=req.body;
   console.log(salary);
   const que="insert into eform (name,eid,department,dob,gender,designation,salary) values (?,?,?,?,?,?,?);";
   db.query(que,[employeeName,employeeId,department,dob,gender,designation,salary],(err,result)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("success");
    }

   });

  
});

app.listen(port,()=>{
    console.log("running");
});