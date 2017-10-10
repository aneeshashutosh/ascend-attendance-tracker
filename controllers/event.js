const Event = require('../models/Event');

/**
 * GET /events
 * Events page.
 */
exports.index = (req, res) => {
    Event.find({}, function(err, events) {
        res.render('events', {
            title: 'Events',
            events: events
        });
    });
};

/**
 * GET api/events/
 * Displays all events
 */
exports.listEvents = (req, res) => {
    Event.find({}, function(err, events) {
        if (err) {
            return handleError(err);
        }
        res.send(events);
    }).lean();
};