# ReviewMe

ReviewMe is a nodejs app that monitors App Store and Google Play reviews, and posts them to email.

This project was originally forked from [reviewMe](https://github.com/TradeMe/ReviewMe)


## Usage

Place the `config.json` and optional `google-key-<account>.json` files in the `~/ReviewMe/config` folder

Run `docker-compose up -d` in app folder

## Config

ReviewMe requires a config file. A simple config looks something like:

```json
{
  "emailSmtpHost": "mail.com",
  "emailSmtpPort": "25",
  "emailSmtpUser": "username",
  "emailSmtpPassword": "password",
  "emailFrom": "from@email.com",
  "emailTo": "to@email.com",
  "verbose": true,
  "dryRun": false,
  "interval": 300,
  "apps": [
    {
      "appId": "com.myandroidapp",
      "publisherKey": "~/google-key.json"
    },
    {
      "appId": "012345678",
      "regions": [
              "nz",
              "us"
      ]
    }
  ]
}
```
### Options
* **emailSmtpHost**: SMTP host,
* **emailSmtpPort**: SMTP port,
* **emailSmtpUser**: SMTP username,
* **emailSmtpPassword**: SMTP user password,
* **emailFrom**: From address,
* **emailTo**: To address,
* **verbose**: When enabled, log messages will be printed to the console
* **dryRun**: When enabled, ReviewMe will post the latest app review for each app on startup. Useful for debugging
* **botIcon** An image url to use for the bot avatar
* **showAppIcon** Determines if app icon will be displayed (overrides botIcon)
* **interval** The interval (in seconds) to check for new reviews. Default: `300`.
* **apps** A list of apps to fetch reviews for. See App Options below
* **publisherKey** *Android Only* The path to a Google Play Publisher private key (`.json` file). Used for accessing the Google Play Publisher API.

### App options
Note: Some options override the global configuration

* **appId** The Android app package name, or the iOS app ID.
* **regions** *iOS Only* The [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2#Current_codes) regions to fetch reviews for (use `false` to include all regions)
* **botIcon** An image url to use for the bot avatar
* **showAppIcon** Determines if app icon will be displayed (overrides botIcon)
* **channel** Overrides the default Slack channel messages will be posted to


## Google Play Publisher Key
ReviewMe requires access to the Google Play Publisher API to fetch reviews. You need to supply ReviewMe with a Google Play Publisher API private key:

* Go to the Google Play Developer Console -> Settings -> API Access
* Create a Google Play Android Developer project
* Create a Service Account with "Service Accounts" -> "Service Account User" role
* Download the private key (`.json`)
* Supply the path to the private key in the `config.json`

 



