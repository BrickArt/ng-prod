var async = require('async');
var express = require('express');
var router = express.Router();

var config = require('../../config/index.config');

var Category = require('../../models/category.model').Category;


router.route('/categories/:id?')
    .post(function (req, res, next) {
        var doc = new Category(req.body);
        doc.save(function (err) {
            if (err) {
                console.error(err);
                res.status(403).send(err);
            } else {
                console.log("Item #" + doc._id.toString() + " is added!");
                res.status(200).send(doc.getPublicFields())
            }
        });
    })
    .get(function (req, res, next) {
        if(req.params.id) {
            Category.findById(req.params.id, function (err, cat) {
                if (err) return res.status(500).send("There was a problem finding the user.");
                if (!cat) return res.status(404).send("empty");

                res.status(200).send(cat.getPublicFields());
            })
        } else {
            Category.find({}, function(err, cat) {
                if (err) return res.status(500).send("There was a problem finding the user.");
                if (!cat) return res.status(404).send("empty");
                
                res.status(200).send(cat.map((c) => { return c.getPublicFields() }));
            })
        }
    })
    .put(function (req, res, next) {
        Category.findById(req.params.id, function (err, cat) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!cat) return res.status(404).send("empty");
            cat.capacity = req.body.capacity;
            cat.name = req.body.name;

            cat.save(function (err) {
                if (err) {
                    console.error(err);
                    res.status(403).send(err);
                } else {
                    console.log("Item #" + cat._id.toString() + " is added!");
                    res.status(200).send(cat.getPublicFields())
                }
            });
        })
    })


module.exports = router;