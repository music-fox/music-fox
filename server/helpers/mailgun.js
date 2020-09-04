const mailgun = require("mailgun-js");
const api_key = process.env.API_MAILGUN
const DOMAIN = 'sandbox0e05312369134497ab99f17f1f5e00e0.mailgun.org';
const mg = mailgun({apiKey: api_key, domain: DOMAIN});

function mail(email) {
    const data = {
        from: 'Fariz <rachimawan@gmail.com>',
        to: email,
        subject: 'Hello',
        text: 'Testing some Mailgun awesomness!'
    };
    mg.messages().send(data, function (error, body) {
        if (error) {
            console.log(error);
        }
        console.log(body);
    });
}

module.exports = mail


