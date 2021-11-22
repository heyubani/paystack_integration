const express = require("express")
const db = require("../db")
const route  = require("./router")


const app = express()
const PORT = 8000

// handle middleware to convert request to json format
app.use(express.json());
app.use(express.urlencoded({ extended: true}))


// home route page
app.get("/", (req, res) => {
    res
      .json({
        status: "success",
        Message: "backend project with paystack api",
      })
      .status(200);
})


app.use(route)

// handle error middleware
app.use((req, res) => {
    res.send("page not found")
})

  db.connect()
    .then((obj) => {
      app.listen(PORT, () => {
        obj.done();
        console.log(`starting on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.log(error.message);
    });

  module.exports = app;