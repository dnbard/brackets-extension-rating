var request = require('request'),
    _ = require('lodash'),
    zlib = require('zlib'),
    async = require('async'),
    mongoose = require('mongoose'),
    bus = require('./bus'),
    Extension = require('../models/extension'),
    registryPath = 'http://s3.amazonaws.com/extend.brackets/registry.json',
    body,
    customPiper = {
        on: function(){},
        once: function(){},
        write: function(src){ body += src; },
        end: function(){
            var json = JSON.parse(body);
            processJSON(json);
        },
        emit: function(){}
    };

function processJSON(payload){
    var done = 0,
        size = _.size(payload);

    var commands = [];

    _.each(payload, function(ext){
        commands.push(function(callback){
            Extension.process(ext, callback);
        });
    });

    async.parallel(commands, function(err, result){
        body = undefined;

        console.log('parallel done');
        bus.emit(bus.list.REGISTRY.UPDATED, result);
    });
}

exports.handler = function(){
    body = '';

    request({ url: registryPath })
        .pipe(zlib.createGunzip())
        .pipe(customPiper);
}

exports.dbFilter = function(){
    /*setTimeout(function(){
        console.log('db filter');
        var stream = Extension.stream();

        stream.on('data', function (extension) {
            if (!extension.downloads || extension.downloads.lenght === 0) return;

            for(var i = extension.downloads.lenght - 1; i >= 0; i--){
                var version = extension.downloads[i];
            }
        });
    }, 8000);*/
}
