var passport = require('passport')
var mongoose = require('mongoose')
var User = mongoose.model('User')
var generatePassword = require('password-generator');

let sendMail = require('./mailer')

var sendJSONresponse = function(res, status, content) {
  res.status(status)
  res.json(content)
}

module.exports.register = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   })
  //   return
  // }
  console.log('registration')
  var user = new User()

  let password = generatePassword(12, false)

  user.name = req.body.name
  user.email = req.body.email
  user.login = req.body.login
  user.organisation = req.body.organisation

  user.openPassword = password
  user.role = 'psycholog'

  console.log(password)

  //sendMail(user.email ,password,user) //посылаем данные для входа

  user.setPassword(password)

  user.save(function(err) {
    var token
    token = user.generateJwt()
    res.status(200)
    res.json({
      "token" : token
    })
  })

}

module.exports.login = function(req, res) {

  passport.authenticate('local', function(err, user, info){
    var token

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err)
      return
    }

    // If a user is found
    if(user){
      token = user.generateJwt()
      res.status(200)
      res.json({
        "token" : token
      })
    } else {
      // If user is not found
      res.status(401).json(info)
    }
  })(req, res)

}