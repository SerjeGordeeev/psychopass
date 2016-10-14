var mongoose = require('mongoose')
var User = mongoose.model('User')


module.exports.getList = function (req, res) {
  let query = User.find(cleanQueryObj(req.query))
  query.select('name role group organisation').exec(function(err, users){
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
      updateData(doc, req.body)
      doc.save(err=> {
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
