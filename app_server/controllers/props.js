const mongoose = require('mongoose')
const Organisation = mongoose.model('Organisation')
const User = mongoose.model('User')
const Prop = mongoose.model('Property')
const async = require('async')
const url = require('url')


module.exports.getList = function (req, res) {
    Prop.find(req.query.id?{_id:mongoose.Types.ObjectId(req.query.id)}:{}, (err, groups)=>{
        if(err) dataError(res,err)
        else{
                res.status(200)
                res.json(groups)
        }
    })
}

module.exports.delete = function (req, res) {
    Prop.findOne({'_id': mongoose.Types.ObjectId(req.query.id)}, (err, data)=>{
        if(err) dataError(res,err)
        else {
            User.find({role:'student'},(err, users)=>{
                users.forEach(user=>{
                    console.log(user.properties)
                })
                res.status(200)
                res.json({
                    message: 'Характеристика успешно удалена'
                })
/*                data.remove(err=>{
                    if(err) dataError(res,err)
                    else{
                        res.status(200)
                        res.json({
                            message: 'Характеристика успешно удалена'
                        })
                    }
                })*/
            })
        }
    })

}

module.exports.add = function (req, res) {

    let prop = new Prop()

    updateData(prop, req.body)

    prop.save(function(err){
        if(err) dataError(res,err)
        else{
            res.status(200)
            res.json({
                message: 'Характеристика успешно добавлена'
            })
        }
    })

}

module.exports.update = function (req, res) {
    Prop.findOne({'_id': mongoose.Types.ObjectId(req.body.id)}, function (err, doc) {
        if (err) dataError(res,err)
        else {
            updateData(doc, req.body)
            doc.save(err=> {
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