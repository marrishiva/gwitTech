const request = require("request")
class SlackMessage {
    constructor() {
        this.request = request;
    }

    sendSMessage(slackUrl) {
        let url = "https://slack.com/api/chat.postMessage";
        let options = {
            "channel": "D01EBSTURBN",
            "text": slackUrl
        }
        this.request.post({
            url: url,
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer" + " " + "xoxb-1428272868914-1475018786358-S4icr0fbP9SGQDM5AJ8pUYrk",
            },
            body: JSON.stringify(options)
        }, (error, response, body) => {
            if (error) {
                console.log('Error:' + JSON.stringify(error));
            } else {
                console.log(response.statusCode, JSON.parse(body));
            }

        });
    }
}

module.exports = SlackMessage;