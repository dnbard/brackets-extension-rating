var cache = {},
    _ = require('lodash'),
    mongoose = require('mongoose'),
    Users = mongoose.model('user2app');

function init(){
    Users.distinct('user')
        .lean()
        .exec()
        .then(function(users){
            _.each(users, function(user){
                cache[user] = true;
            });
        });
}

function check(id){
    return !!cache[id];
}

function add(id){
    cache[id] = true;
}

exports.init = init;
exports.check = check;
exports.add = add;
