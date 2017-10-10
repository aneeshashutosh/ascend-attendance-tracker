const Attendee = require('../models/Attendee');

/**
 * GET /people
 * People page.
 */
exports.index = (req, res) => {
    Attendee.find({}, function(err, people) {
        res.render('people', {
            title: 'People',
            people: people
        });
    });
};

/**
 * GET /api/people/
 * Displays all people
 */
exports.listPeople = (req, res) => {
  Attendee.find({}, function(err, people) {
    if (err) {
      return handleError(err);
    }
    res.send(people);
  }).lean();
};