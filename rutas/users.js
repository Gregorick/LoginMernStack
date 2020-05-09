const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/users');
router.use(cors());
process.env.SECRET_KEY = 'secret';

router.get('/usuarios', async (req, res) => {
   const users =  await User.find()
   res.json(users)
})

router.post('/register', (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const today = new Date();
    const userData = { first_name, last_name, email, password, creacted: today };  
    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if (!user) {
           bcrypt.hash(req.body.password, 10, (err, hash) => {
               userData.password = hash
               User.create(userData)
               .then(user => {
                   res.json({Status: user.email + ' Registrado'})
               })
               .catch(err => {
                   res.send('error:' + err);
               })
           })   

        } else {
            res.json({Error: 'Usuario Ya registrado'})
        }
    })
    .catch(err => {
        res.send('error:' + err)
    })
})

router.post('/login', (req, res) => {
  User.findOne({
      email: req.body.email
  })
  .then(user => {
      if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
              const payload = {
                  _id: user._id,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  email: user.email
              }
              let token = jwt.sign(payload, process.env.SECRET_KEY,{
                  expiresIn: 1440
              })
              res.send(token)
          } else {
              res.json({Error: 'Usuario no existe'})
          }
      } else {
          res.json({error: 'Usuario no existe' })
      }
  })
  .catch(err => {
      res.send('error:' + err)
  })
})

router.get('/profile', (req, res) => {
    const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    User.findOne({
        _id: decoded._id
    })
    .then(user => {
        if (user) {
            res.json(user)
        } else {
            res.send("Usuario no existe")
        }
    })
    .catch(err => {
        res.send('error:' + err)
    })
})

module.exports = router;
