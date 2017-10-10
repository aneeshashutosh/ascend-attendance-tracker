const Attendee = require('../models/Attendee');
const Event = require('../models/Event');

/**
 * GET /upload
 * Upload page.
 */
exports.index = (req, res) => {
    res.render('upload', {
        title: 'Upload'
    });
};

/**
 * POST /upload/submit
 * Create a new local account.
 */
exports.uploadEventData = (req, res, next) => {
    const event = new Event({
        name: req.body.event,
        attendees: []
    });

    const data = req.body.data;
    const lines = data.toString().split('\r\n');

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        const items = line.toString().split('\t');
        const name = items[0].trim();
        const email = items[1].trim();

        let person = new Attendee({
            name: name,
            email: email,
            events: []
        });

        Attendee.findOne({ email: email }, (err, attendee) => {
            if (err) {
                req.flash('errors', { msg: 'Invalid data.' });
                return next(err);
            }

            // If the attendee already exists
            if (attendee) {
                person = attendee;
            }
            person.events.push(event.name);
            person.save((err) => {
                if (err) {
                    req.flash('errors', { msg: 'Invalid data.' });
                    return next(err);
                }
            });
        });
        console.log(person._id);
        event.attendees.push(person.name + ' (' + person.email + ')');
    }

    event.save((err) => {
        if (err) {
            req.flash('errors', { msg: 'Invalid data.' });
            return next(err);
        }
    });
    res.redirect('/events');
};