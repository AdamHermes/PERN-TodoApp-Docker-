const express = require("express");
var router = express.Router()
router.get('/', (req,res)=>{
    res.send("router 1 user")
})
router.get('/product', (req,res) =>{
    res.send("router 1 product")
})
router.post('/register',(req,res,next)=>{
    var username = req.body.username
    var password = req.body.password
    console.log(username, password)
    res.send("End here")
})
router.put('/',(req,res)=>{
    res.send("router 1 user get" + req.body.username + " " + req.headers.data)
})
router.delete('/',(req,res)=>{
    res.send("route 1 user delete.")
})
router.get('/cart',(req,res)=>{
    res.send('router 1 cart') 
})
router.get('/:id',(req,res)=>{
    res.send("router 1 user " + req.params.id )
})
module.exports = router