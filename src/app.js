const express=require("express");
const cors=require("cors");
const app=express();
require("./config/dbConnection")()

app.use(express.json());
app.use(cors())
app.use('/api',require("./api/index"))

// base url
app.get("/",(_,res)=>res.json("travel api running..."))

module.exports=app;