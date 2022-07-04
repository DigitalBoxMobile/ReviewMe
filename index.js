var reviews = require('./reviews');
const nodemailer = require("nodemailer");

module.exports.start = function start(config) {

    const transporter = nodemailer.createTransport({
        host: config.emailSmtpHost,
        port: config.emailSmtpPort,
        secure: false,
        tls: {
            rejectUnauthorized: false,
        },
        auth: {
            user: config.emailSmtpUser,
            pass: config.emailSmtpPassword
        }
    });

    for (var i = 0; i < config.apps.length; i++) {
        var app = config.apps[i];

        reviews.start({
            emailTransporter: transporter,
            emailFrom: config.emailFrom,
            emailTo: config.emailTo,
            verbose: config.verbose,
            dryRun: config.dryRun,
            interval: config.interval,
            botIcon: app.botIcon || config.botIcon,
            showAppIcon: app.showAppIcon || config.showAppIcon,
            channel: app.channel || config.channel,
            publisherKey: app.publisherKey,
            appId: app.appId,
            appName: app.appName,
            regions: app.regions
        })
    }
};
