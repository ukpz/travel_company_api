const express=require("express");
const app=express();
require("./config/dbConnection")()

app.use(express.json());
app.use('/api',require("./api/index"))

app.get("/",(_,res)=>res.json("travel api running..."))

module.exports=app;