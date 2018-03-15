var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var User = require('../../models/user.model').User;

router.route('/users')
    .get(function(req, res, next) {
        if (req.query.email) {
            User.findOne({ email: req.query.email }, function (err, user) {
                if (err) return res.status(500).send("There was a problem finding the user.");
                if (!user) return res.status(404).send("empty");
                res.status(200).send(user.getPublicFields());
            });
        } else {
            return res.status(404).send("empty");
        }
    })
    .post(function(req, res, next) {
        var doc = new User(req.body);
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