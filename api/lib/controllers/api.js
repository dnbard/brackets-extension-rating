'use strict';

var mongoose = require('mongoose')/*,
    Thing = mongoose.model('Thing')*/;


    exports.getAllRatings = function(req, res){
        return res.send({});
    }
    
    exports.setRatings = function(req, res){
        return res.status(200).send();
    }
};