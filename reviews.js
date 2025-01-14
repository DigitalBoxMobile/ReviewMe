const appstore = require('./appstorereviews.js');
const googlePlay = require('./googleplayreviews.js');
const fs = require('fs');

const REVIEWS_STORES = {
    "APP_STORE": "app-store",
    "GOOGLE_PLAY": "google-play"
};

var published_reviews;
try {
    published_reviews = JSON.parse(fs.readFileSync('/config/published_reviews.json'));
} catch (err) {
    published_reviews = {}
}

(function () {
    exports.start = function start(config) {
        if (!config.store) {
            // Determine from which store reviews are downloaded
            config.store = (config.appId.indexOf("\.") > -1) ? REVIEWS_STORES.GOOGLE_PLAY : REVIEWS_STORES.APP_STORE;
        }

        if (config.store === REVIEWS_STORES.APP_STORE) {
            appstore.startReview(config, !published_reviews[config.appId]);
        } else {
            googlePlay.startReview(config, !published_reviews[config.appId])
        }
    }
}).call(this);


// Published reviews
exports.markReviewAsPublished = function (config, review) {
    if (!review || !review.id || this.reviewPublished(config, review)) return;

    if (!published_reviews[config.appId]) {
        published_reviews[config.appId] = []
    }

    if (config.verbose) {
        console.log("INFO: Checking if we need to prune published reviews have (" + published_reviews[config.appId].length + ") limit (" + REVIEWS_LIMIT + ")");
    }
    if (published_reviews[config.appId].length >= REVIEWS_LIMIT) {
        published_reviews[config.appId] = published_reviews[config.appId].slice(0, REVIEWS_LIMIT);
    }

    published_reviews[config.appId].unshift(review.id);

    if (config.verbose) {
        console.log("INFO: Review marked as published: " + JSON.stringify(published_reviews[config.appId]));
    }

    fs.writeFileSync('/config/published_reviews.json', JSON.stringify(published_reviews), { flag: 'w' })
};

exports.reviewPublished = function (config, review) {
    if (!review || !review.id || !published_reviews[config.appId]) return false;
    return published_reviews[config.appId].indexOf(review.id) >= 0;
};

exports.publishedReviews = function () {
    return published_reviews;
};

exports.resetPublishedReviews = function () {
    return published_reviews = {};
};

exports.postToEmail = function (message, config) {
    config.emailTransporter.sendMail({
        from: config.emailFrom, // sender address
        to: config.emailTo, // list of receivers
        subject: message.subject, // Subject line
        html: message.body, // html body
    });
};
