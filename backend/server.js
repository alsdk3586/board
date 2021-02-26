const express =require('express');
const { sequelize } = require('./models');
const app= express();
const PORT=8000;


sequelize
.sync({force:false})
.then(()=> console.log("success connect db"))
.catch((err)=>console.log(err));



app.get("/",(req,res)=>{
    return res.json({hello:"world"});
})

app.listen(PORT,() => console.log(`this server listening on ${PORT}`));
