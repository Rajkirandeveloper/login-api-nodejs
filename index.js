const expres=require('express');
const authRouter=require("./routes/auth")
const app=expres()
const bodyParser=require('body-parser');
const mongoose=require('mongoose')

app.use(bodyParser.json())
app.get ('/',(req,res)=>{
    res.send("Home Page")
})



app.use('/api',authRouter)
mongoose
  .connect(
    'mongodb+srv://rajkiran335:rajkiran335@cluster0.3frasmh.mongodb.net/login-api?retryWrites=true&w=majority'
  )
app.listen(3000)