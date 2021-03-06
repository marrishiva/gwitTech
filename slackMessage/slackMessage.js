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
                "Authorization": "Bearer" + " " + "xoxp-1428272868914-1428480128819-1482126710195-77ac3abde38574b361f7c75178bfd312",
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