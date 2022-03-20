const express=require("express");
const connect=require("./configs/db");
const userController=require("./controllers/user.controller");
const app=express();
app.use(express.json());


app.use("/users", userController);
module.exports=app;

app.listen(5000, async()=>{
    try {
        await connect();
        console.log("Listening To Port 5000")
    } catch (error) {
        console.log(error)
    }
});