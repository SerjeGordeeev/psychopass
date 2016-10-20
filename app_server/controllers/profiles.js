const mongoose = require('mongoose')
const User = mongoose.model('User')
const async = require('async')
const generateLogin = require('password-generator')

module.exports.getList = function (req, res) {
  let query = User.find(cleanQueryObj(req.query))
  query.select('name role group organisation email properties').exec(function(err, users){
    if(err) dataError(res,err)
    else{
      res.status(200)
      res.json(users)
    }
  })
}

module.exports.update = function (req, res) {

  if(req.body.ids){
      console.log(req.body.ids)
      async.filter(req.body.members, function(member, callback) {
        User.findOne({'_id':  mongoose.Types.ObjectId(member._id)}, (err,user)=>{
            if(err) dataError(res,err)
            else{
              updateData(user, member)
              user.save((err)=>{
                if(err) dataError(res,err)
                else callback(null, !err)
              })
            }
        })
      },function(err, results){
        if(err) dataError(res,err)
        else {
          res.status(200)
          res.json({message:'Участники успешно добавлены в группу'})
        }
      })
  }
  else{
    User.findOne({'_id': mongoose.Types.ObjectId(req.body.id)}, function (err, doc) {
      if (err) dataError(res,err)
      else {
        //let queries = []
        updateData(doc, req.body)
        if(doc.group){
          User.update({group: doc.group, role: 'psycholog'}, { group: null }, {}, function(err){
            if(err) dataError(err)
            else doc.save(function(err){
              if (err) dataError(res,err)
              else {
                res.status(200)
                res.json({
                  message: 'Данные сохранены'
                })
              }
            })
          })
        }
        else doc.save(function(err){
          if (err) dataError(res,err)
          else {
            res.status(200)
            res.json({
              message: 'Данные сохранены'
            })
          }
        })
      }
    })
  }

}

module.exports.delete = function (req, res) {
  //console.log('DELETE', req.query.id)
  User.findOne({'_id': mongoose.Types.ObjectId(req.query.id)}, (err, data)=>{
    if(err) dataError(res,err)
    else {
      data.remove(err=>{
        if(err) dataError(res,err)
        else{
          res.status(200)
          res.json({
            message: 'Участник успешно удален'
          })
        }
      })
    }
  })

}

module.exports.add = function (req, res) {

  let user = new User()

  user.name = req.body.name
  user.role = req.body.role
  user.organisation = req.body.organisation
  generateUniqLogin(user)

    user.save(function(err){
      if(err) dataError(res,err)
      else{
        res.status(200)
        res.json({
          message: 'Участник успешно добавлен'
        })
      }
    })

  user.login = generateLogin()//require('password-generator')(12, false)
  
}

module.exports.upload = function (req, res) {
  require('./utils/upload').uploadFile(req, res, function (users) {
    async.filter(users, function (userData, callback) {
      let user = new User()

      try{
        user.name = orgData['Имя']
        user.organisation = req.body.org_id
        user.role = 'student'
        generateUniqLogin(user)
      }
      catch (err){
        dataError(res,err)
      }
      //console.log(org, orgData)
      user.save(function (err) {
        if (err) dataError(res,err)
        else callback(null, !err)
      })
    }, function (err) {
      if (err) dataError(res,err)
      else {
        res.status(200)
        res.json({message:'Представители успешно импортированы'})
      }
    })
  })
}


function generateUniqLogin(user){
  User.find({},(err,data)=>{
    user.login = generateLogin(12, false)
    while(data.find(profile=>profile.login == user.login)){
      user.login = generateLogin(12, false)
    }
  })
}
