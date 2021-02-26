const express =require('express')
const app= express();
const PORT=8000;


app.listen(PORT,() => console.log(`this server listening on ${PORT}`));

app.get("/",(req,res)=>{
    return res.json({hello:"world"});
})