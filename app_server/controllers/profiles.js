const mongoose = require('mongoose')
const User = mongoose.model('User')
const async = require('async')

module.exports.getList = function (req, res) {
  let query = User.find(cleanQueryObj(req.query))
  query.select('name role group organisation email').exec(function(err, users){
    if(err) dataError(res)
    else{
      res.status(200)
      res.end(JSON.stringify(users))
    }
  })
}

module.exports.update = function (req, res) {

  User.findOne({'_id': mongoose.Types.ObjectId(req.body.id)}, function (err, doc) {
    if (err) dataError(res)
    else {
      //let queries = []
      updateData(doc, req.body)
      if(doc.group){
          User.update({group: doc.group}, { group: null }, {}, function(err){
            if(err) dataError(err)
            else doc.save(function(err){
              if (err) dataError(res)
              else {
                res.status(200)
                res.end(JSON.stringify({
                  message: 'Данные сохранены'
                }))
              }
            })
          })
      }
      else doc.save(function(err){
        if (err) dataError(res)
        else {
          res.status(200)
          res.end(JSON.stringify({
            message: 'Данные сохранены'
          }))
        }
      })
    }
  })

}
