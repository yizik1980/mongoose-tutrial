const express = require('express')
const student = require('../model/studet');
const router = express.Router();

router.post('/new', async (req,res)=>{
     const s = new student(req.body);
        const saveRes = await s.save();
        console.log(saveRes);
        res.send(req.body);
});
router.put('/update',async (req,res)=>{

});
module.exports = router