var request = require("request");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
let SlackMessage = require("../slackMessage/slackMessage")
class JiraIssueCreator {
    constructor() {
        this.request = request;
        this.slackMessage = new SlackMessage();
    }

    createJiraIssue(summary, description, attachment) {
        let options = {
            "fields": {
                "project":
                {
                    "key": "SUP"
                },
                "summary": summary,
                "description": description,
                "issuetype": {
                    "name": "Bug"
                }
            }

        }

        this.request.post({
            url: 'https://marrishivanodejs.atlassian.net/rest/api/2/issue',
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            auth: { username: "marrishiva72@gmail.com", password: "Fcn9EAgANrb59dkNkA2p4F03" },
            body: JSON.stringify(options)
        }, (error, response, body) => {
            if (error) {
                console.log('Error:' + JSON.stringify(error));
            } else {
                let obj = JSON.parse(body);
                if (attachment) {

                    console.log("key", obj["key"]);
                    for (let i = 0; i < attachment.length; i++) {
                        this.addAttachement(attachment[i], obj["key"]);
                    }

                }
                this.slackMessage.sendSMessage(obj["self"])
                console.log(response.statusCode, JSON.parse(body));
            }

        });
    }

    addAttachement(attachment, key) {
        var options = {
            url: 'https://marrishivanodejs.atlassian.net/rest/api/latest/issue/' + key + '/attachments',
            headers: {
                'Authorization': `Basic ${Buffer.from('marrishiva72@gmail.com:Fcn9EAgANrb59dkNkA2p4F03').toString('base64')}`,
                'X-Atlassian-Token': 'nocheck'
            }
        };

        var r = request.post(options, function (err, res, body) {
            if (err) {
                console.error(err);
            } else {
                console.log('Upload successful!  Server responded with:', body);

            }
        }
        );

        var form = r.form();
        form.append('file', fs.createReadStream(attachment));

    }
}

module.exports = JiraIssueCreator