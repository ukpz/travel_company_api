const app = require("./app")
require("dotenv").config();

//start server
app.listen(process.env.PORT, () => {
    console.log(`server is listening on: http://localhost:${process.env.PORT}`);
})