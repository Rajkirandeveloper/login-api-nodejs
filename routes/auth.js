const expres=require('express');
const router=expres.Router()
const User=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

router.get('/',(req,res,next)=>{
    res.send("Login working")
})

router.post('/signup',(req,res,next)=>{
    //password=abcdefghijklmn

    const name=req.body.name;
    const password=req.body.password
    bcrypt.hash(password,12,(err,hashed)=>{
        if(err){
            res.status(404).json({message:"Hashed password not generated"})
        }
        const user=new User({
            name:name,
            password:hashed
    
        })
        user.save().then(result=>{
            res.status(200).json({message:'User created successfully',data:result})
        }).catch(err=>{
            console.log(err)
        })

 })
    
})

router.post('/login',(req,res,next)=>{
   User.find({name:req.body.name})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({message:"No user in database"})
        }
        // console.log(  bcrypt.compare(req.body.password,user.password))
        if(user){
          bcrypt.compare(req.body.password,user[0].password).then(result=>{
            console.log(result)

            //generate Jwt token
            if(!result){
                res.status(401).json({
                   message:"you entered wrong password"
                })

            }
            if(result){
                const token=jwt.sign({
                    name:user[0].name
                },"this is dummy text",{expiresIn:"24h"})

                res.status(200).json({
                    name:user[0].name,
                    token:token
                })
            }
            


          }).catch(err=>{
            res.status(401).json({message:"Password not matched",password:user.password})
          })
        }

    })
    .catch(err=>{
        console.log(err)
    })

})

module.exports=router