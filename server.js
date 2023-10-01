const express = require('express')
const blogRouter = require('./routes/blogRoutes')
require("dotenv").config({path : "./data/config.env"});
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api",blogRouter);

app.listen(process.env.PORT, () => {console.log(`Server running on PORT ${process.env.PORT}`)})