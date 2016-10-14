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

function cleanQueryObj(queryObj){
  for(let prop in queryObj){
    if(queryObj[prop] === 'null') queryObj[prop] = null
  }
  return queryObj
}

// function generateQueryParams(queryObj) {
//   let params = {}
//   for(let prop in queryObj){
//
//   }
//   return params
// }

// if(req.query.with_members){
//   async.filter(users, function(org, callback){
//     let query = User.find({'organisation': org._id})
//     query.select('name email role group')
//     query.exec({'organisation': org._id}, function (err, users) {
//       org.members = users
//       callback(null, !err)
//     })
//   },function(err, results){
//     //console.log(results)
//     res.status(200)
//     res.end(JSON.stringify(organisation))
//   })
// }