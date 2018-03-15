var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var myEvent = require('../../models/event.model').Event;


router.route('/events/:id?')
    .get(function (req, res, next) {
        if (req.params.id) {
            myEvent.findById(req.params.id, function (err, event) {
                if (err) return res.status(500).send("There was a problem finding the user.");
                if (!event) return res.status(404).send("empty");

                res.status(200).send(event.getPublicFields());
            })
        } else {
            myEvent.find({}, function (err, event) {
                if (err) return res.status(500).send("There was a problem finding the user.");
                if (!event) return res.status(404).send("empty");

                res.status(200).send(event.map((e) => { return e.getPublicFields() }));
            })
        } 
    })
    .post(function (req, res, next) {
        var doc = new myEvent(req.body)
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


module.exports = router;