var mongoose = require('mongoose'),
    Application = mongoose.model('Application'),
    _ = require('lodash')
    keys = {};

function init(){
    Application.find({})
        .lean()
        .exec()
        .then(function(applications){
            keys = {};

            _.each(applications, function(app){
                keys[app._id] = app.name;
            });

            console.log(keys);
        });
}

function check(application){
    return keys[application] !== undefined;
}

init();
exports.init = init;
exports.check = check;
