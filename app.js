const express = require('express');
const app = express();


app.listen(8000, function () {
    console.log("helo");
});
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/in.html");
})
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://prashant_tomar:qwertyuiop23@clustermeg-dkebi.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: String
});
var User = mongoose.model("User", nameSchema);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/addname", (req, res) => {

    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});