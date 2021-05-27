//1 Import Dependecies
const express = require('express');
const app = express();
require("dotenv").config();

//2 Allow parse on request bodies
app.use(express.json());


//3 Import routes for api
const watsonRoutes = require("./routes/api/watson");
app.use("/api/watson", watsonRoutes);





//4 Start Server
const port = process.env.PORT || 5050;
app.listen(port,()=> {
    console.log("Server listening on port", port)
    console.log("Hello World")
} )
