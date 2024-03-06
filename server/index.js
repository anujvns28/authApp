const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./cofig/dbConnect");
const authRoute = require("./routes/auth")


require("dotenv").config();
 const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;

const PORT = process.env.PORT || 4000
const clientid = "891439499171-tdbonjb6u6ioj1nd9o2ivq471no77nhr.apps.googleusercontent.com"
const clientsecret = "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"

app.use(cors ({
    origin: '*',
    optionsSutccessStatus: 200,
    methods:["PUT","POST"]
  }))

  app.use(express.json())

  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  })) 

dbConnect();

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID:clientid,
        clientSecret:clientsecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        try {
            console.log(profile,"profile")
            return done(null,profile)
        } catch (error) {
            return done(error,null)
        }
    }
    )

)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});


app.get('/auth/google', passport.authenticate('google', { scope:[ 'email', 'profile' ] }));
 
app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
      successRedirect:"http://localhost:3000/dashboard",
      failureRedirect:"http://localhost:3000/login"
}));

app.get("/login/sucess",async(req,res)=>{
  if(req.user){
      res.status(200).json({message:"user Login",user:req.user})
  }else{
      res.status(400).json({message:"Not Authorized"})
  }
})

//mounting
app.use("/auth",authRoute)

app.listen(PORT,() =>{
    console.log("Server Started successfully")
})  