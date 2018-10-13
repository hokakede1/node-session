require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true 
}));

const users = [
    {
        username: "huydang",
        password: "1234",
        favoriteColor: "blue"
    },
    {
        username: "sammy",
        password: "5678",
        favoriteColor: "violet"
    }
]

const controller = {
    login: (req, res) => {
        const {username, password} = req.query;
        const foundUser = users.find(user => {
            return user.username === username && user.password === password
        })
        if(!foundUser) {
            return res.send('Username or Password is wrong')
        }

        req.session.user = foundUser

        res.send('login sucessfully')
    },
    checker: (req, res, next) => {
        const {username, password} = req.query;
        if(req.session.user){
            return res.send(req.session.user)
        }
        if(!username || !password ){
            return res.send('You are missing username or password')
        }
        next()
    }
}


app.get('/login', controller.checker, controller.login)

app.get('/logout', (req, res) => {
    delete req.session.user

    res.send("logout successfully")
})

app.listen(8080, () => {
    console.log('server is running on port 8080')
})