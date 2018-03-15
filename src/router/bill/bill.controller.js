var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var Bill = require('../../models/bill.model').Bill;

var VerifyToken = require('../auth/VerifyToken');

router.route('/bill')
    .get(function (req, res, next) {
       
        Bill.findById('5aaac830019ab60194e7cfd3', function (err, bill) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!bill) return res.status(404).send("empty");
            res.status(200).send(bill.getPublicFields());
        });
        
    })
    // .post(function (req, res, next) {
    //     var doc = new Bill(req.body);
    //     doc.save(function (err) {
    //         if (err) {
    //             console.error(err);
    //             res.status(403).send(err);
    //         } else {
    //             console.log("Item #" + doc._id.toString() + " is added!");
    //             res.status(200).send(doc.getPublicFields())
    //         }
    //     });
    // })
    .put(function (req, res, next) {
        Bill.findById('5aaac830019ab60194e7cfd3', function (err, bill) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!bill) return res.status(404).send("empty");
            bill.value = req.body.value
            bill.save(function (err) {
                if (err) {
                    console.error(err);
                    res.status(403).send(err);
                } else {
                    console.log("Item #" + bill._id.toString() + " is added!");
                    res.status(200).send(bill.getPublicFields())
                }
            });
        });

    })


module.exports = router;