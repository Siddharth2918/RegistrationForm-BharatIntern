const express = require("express")
const mongoose = require("mongoose")

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

mongoose.connect(
    `mongodb://127.0.0.1:27017/RegistrationFormDB`
);
const RegistrationSchema = mongoose.Schema({
    fname : String,
    lname : String,
    email : String,
    password : String,
});

const Register = mongoose.model("Registraion", RegistrationSchema);
 
app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/pages/registerPage.html")
});

app.get("/error", (req, res)=>{
    res.sendFile(__dirname+"/pages/errorPage.html")
});

app.post("/register", async (req, res)=>{
    try{
        const {fname, lname, email, password} = req.body;
        const existing = await Register.findOne({email: email});
        if(existing){
            res.redirect("/error");
        }
        else{
            const data = new Register({
                fname,
                lname,
                email,
                password,
            });
            await data.save();
            res.sendFile(__dirname+'/pages/successPage.html');
        }
    }
    catch(error){
        res.sendFile(__dirname + "/pages/errorPage.html");
    }
});

app.listen(port, ()=>{
    console.log(`App is live on port http://localhost:${port}`);
});
