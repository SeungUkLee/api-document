'use strict';
// Include our "db"
var db = require('../../config/db')();
// Exports all the functions to perform on the db
module.exports = {getAll, save, getOne, update, delpost};

//GET /post operationId
function getAll(req, res, next) {
  res.json({ posts: db.find()});
}
//POST /post operationId
function save(req, res, next) {
    res.json({success: db.save(req.body), description: "post added to the list!"});
}
//GET /post/{id} operationId
function getOne(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    var post = db.find(id);
    if(post) {
        res.json(post);
    }else {
        res.status(204).send();
    }       
}
//PUT /post/{id} operationId
function update(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    var post = req.body;
    if(db.update(id, post)){
        res.json({success: 1, description: "post updated!"});
    }else{
        res.status(204).send();
    }

}
//DELETE /post/{id} operationId
function delpost(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    if(db.remove(id)){
        res.json({success: 1, description: "post deleted!"});
    }else{
        res.status(204).send();
    }

}