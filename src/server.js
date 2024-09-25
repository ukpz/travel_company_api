const express=require("express");
const cors=require("cors");
const app=express();

require("dotenv").config();
require("./config/dbConnection")()

app.use(express.json());
app.use(cors())
app.use('/api',require("./routes"))

// base url
app.get("/",(_,res)=>res.json("travel api running..."))

//start server
app.listen(process.env.PORT, () => {
    console.log(`server is listening on: http://localhost:${process.env.PORT}`);
})