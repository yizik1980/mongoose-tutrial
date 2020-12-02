const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const student = require('./model/studet');
const studentRoute = require('./routes/apiStudent');
const app = express();
if (dotenv.error) {
  throw dotenv.error
}
console.log(dotenv.parsed)
app.use(bodyParser.json());

    mongoose.connect(process.env.MONGO_DB, {
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