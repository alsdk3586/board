const express =require('express');
const { sequelize, User } = require('./models');
const {comparePassword, hashPassword} =require("./utils/bcrypt");
const app= express();
const PORT=8000;


sequelize
.sync({force:false})
.then(()=> console.log("success connect db"))
.catch((err)=>console.log(err)); 



app.get("/",(req,res)=>{
    return res.json({hello:"world"});
})

app.get("/api/user",async(req,res)=>{
    console.log("success");
    return res.json({success:true});
});

app.post("/api/user", async(req,res)=>{
    try{
        console.log(req);
        const {email,password,name}= req.body;
        if(email&&password&&name){
            const hashedPassword=await hashPassword(password);
            const data=await User.create({
                email:email,
                password:hashedPassword,
                name:name
            });
            console.log(data);
            return res.json({signup:true});
        }
        else{
            throw new Error();
        }
    }
    catch(err){
        console.log(err);
        return res.json({signup:false});
    }
});

app.post("/api/login",async (req,res)=>{
    const {email,password}=req.body;
    const userData=await User.findOne({
        attributes:['id','password'],
        where:{
            email:email,
        },
    });
    const hashedPassword=userData.dataValues.password;
    const compareResult=await comparePassword(password, hashedPassword);
    if(compareResult){
        return res.json({login:true, id: userData.dataValues.id});
    }
    return res.json({login:false});
})



app.listen(PORT,() => console.log(`this server listening on ${PORT}`));
