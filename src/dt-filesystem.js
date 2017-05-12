'use strict';

module.exports = function(){

    // Filesystem
    var fs = require('fs');

    // Path utility
    var path  = require('path');

    function ensureExists(aPath, mask, cb){

        // Mask is optional
        if ('function' === typeof mask){
            cb = mask;
            mask = '0777';
        }

        var parentPath = aPath.substring(0, aPath.lastIndexOf(path.sep));

        doesPathExist(parentPath, function(err, exists, isDirectory, isFile){

            if(err){
                cb(err);
            }

            // Parent folder exists
            else if(exists){
                createFolder(aPath, mask, cb);
            }

            // Parent folder doesn't exist
            else{
                ensureExists(parentPath, mask, function(){
                    ensureExists(aPath, mask, cb);
                })
            }
        });
    }

    function doesPathExist(path, callback){
        fs.stat(path, function(error, stats){
            if(error){
                if(error.code == "ENOENT"){
                    callback(null, false);
                }
                else{
                    callback(error, false)
                }
            }
            else{
                callback(null, true, stats.isDirectory(), stats.isFile());
            }
        });
    }

    function createFolder(path, mask, callback){

        fs.mkdir(path, mask, function(err){

            if (err) {
                if (err.code == 'EEXIST'){
                    callback(null); // ignore the error if the folder already exists
                }
                else{
                    callback(err); // something else went wrong
                }
            }
            else{
                callback(null); // successfully created folder
            }
        });
    }

    return {

        doesPathExist   : doesPathExist,
        ensureExists    : ensureExists
    }
}

