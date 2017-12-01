
var Empl = require('./empl.model');
var debug = require('debug')('lab1:empl');

module.exports.home = function (req, res) {

    if (req.method === 'POST') {

        var msg = '';

        Empl.create({
            firstName: req.body.fName,
            lastName: req.body.lName,
            department: req.body.department,
            startDate: new Date(req.body.startDate+ ' EST'),
            jobTitle: req.body.title,
            salary: req.body.salary
        })
                .then(function () {
                    msg = 'Employee was Saved';
                    return;
                })
                .catch(function (err) {
                    msg = 'Employee was not Saved';
                    return err.message;
                }).then(function (err) {
            res.render('index', {
                title: 'home',
                message: msg,
                error: err.split(",")
            });
        });

    } else {
        res.render('index', {
            title: 'home',
            message: ''
        });
    }

};

module.exports.view = function (req, res) {

    var id = req.params.id,
            removed = '';

    function finish() {
        Empl
                .find()
                .exec()
                .then(function (results) {
                    res.render('view', {
                        title: 'View Results',
                        results: results,
                        removed: removed
                    });
                });
    }

    if (id) {
        Empl.remove({_id: id})
                .then(function () {
                    removed = `${id} has
                    been removed`;
                            finish();
                })
                .catch(function (err) {
                    removed = `${id} has
                    not been removed`;
                            finish();
                });
    } else {
        finish();
    }

};


module.exports.update = function (req, res) {

    var id = req.params.id;
    var msg = '';

    if (req.method === 'POST') {

        id = req.body._id;

        Empl
                .findById(id)
                .exec()
                .then(function (emplData) {
                    // figure out why the data is not saving.        
                    emplData.firstName = req.body.fName;
                    emplData.lastName = req.body.lName;
                    emplData.department = req.body.department;
                    emplData.startDate = req.body.startDate;
                    emplData.jobTitle = req.body.title;
                    emplData.salary = req.body.salary;

                    return emplData.save();

                })
                .then(function () {
                    msg = 'data has been updated';
                })
                .catch(function (err) {
                    msg = 'data has NOT been updated';
                    debug("Save Error: ");
                    debug(err);
                })
                        .then(function () {
                            finish();
                        });

    } else {
        finish();
    }

    function finish() {

        Empl
                .findOne({'_id': id})
                .exec()
                .then(function (results) {
                    res.render('update', {
                        title: 'Update Results',
                        message: msg,
                        results: results
                    });
                })
                .catch(function () {
                    res.render('notfound', {
                        message: 'Sorry ID not found'
                    });
                });
    }
};
