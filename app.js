import express from 'express';
import microsoft from 'passport-microsoft';
import passport from 'passport';
import env from './env.js';
import axios from 'axios';

const app = express();

const microsoftStrategy = microsoft.Strategy ; 

let token = null ;
passport.use(new microsoftStrategy(
    {
    clientID : env.clientID ,
    clientSecret: env.clientSecret , 
    callbackURL : "http://localhost:5500/auth/microsoft/callback",
    scope : ['openid','profile','email','User.Read','Mail.Read'] 
    },
    function(accessToken,refreshToken,profile,done){
        console.log('accessToken',accessToken);
        console.log('refreshToken',refreshToken);
        done(null,profile.id);
        token = accessToken ;
    }
));

app.set('view engine','ejs');

app.use(express.json());

app.get('/auth/microsoft', passport.authenticate('microsoft', { session: false }));

app.get('/error',(req,res)=>{
    res.render('invalidLogin');
})
app.get('/getemail',async (req,res)=>{
    const result = await axios.get('https://graph.microsoft.com/v1.0/me/messages',{
        headers : {
            'Authorization' : 'Bearer ' + token 
        }
    })
    console.log(result.data);
    res.render('email' , { data : result.data });
})
app.get('/',(req,res)=>{
    res.render('index');
});
app.get('/auth/microsoft/callback', passport.authenticate('microsoft', { session: false, failureRedirect: `https://localhost:4000/error` }), (req, res) => {
  res.redirect('/getemail');
});


export default app ; 