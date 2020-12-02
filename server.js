const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const student = require('./model/studet');
const studentRoute = require('./routes/apiStudent');
const app = express();

app.use(bodyParser.json());

    mongoose.connect('mongodb://localhost:27017/local', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
    }).catch(err=>{
        console.log(err);
    });
    

app.get('/', async (req, res)=>{
      
        const drawStudents = await student.find().sort({ name: 'desc' });
        res.send(drawStudents);
});
app.use('/student',studentRoute);

app.listen(5000);