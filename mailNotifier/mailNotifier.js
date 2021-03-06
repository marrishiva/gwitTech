
let Imap = require('imap');
const notifier = require('mail-notifier');
const fs = require("fs");
const path = require("path");
const JiraIssueCreator = require("../jira/jiraIssueCreate");
const PdfGenrator = require("./pdfGenereator");
let pdfMerger = require("./pdfMerger");
class MailNotiifer {
    constructor() {
        /**create Imp Object */
        this.imap = new Imap({
            user: 'marrishiva72@gmail.com',
            password: 'suryabobbyvinnu',
            host: 'imap.gmail.com',
            port: 993,
            tls: true,
            tlsOptions: { rejectUnauthorized: false }
        })
        this.notifier = notifier;
        this.imapListners();
        this.jiraIssueCreator = new JiraIssueCreator();
    }

    imapListners() {
        this.imap.once('ready', () => {
            let connection = {
                user: 'marrishiva72@gmail.com',
                password: 'suryabobbyvinnu',
                host: 'imap.gmail.com',
                port: 993,
                tls: true,
                tlsOptions: { rejectUnauthorized: false }
            }
            this.notifier(connection)
                .on('mail', this.notifierListener.bind(this)).start()
        });
        this.imap.on("mail", (data) => {
            console.log("new mail arrived", data)
        })
        this.imap.once('error', function (err) {
            console.log(err);
        });

        this.imap.once('end', function () {
            console.log('Connection ended');
        });

        this.imap.connect();

    }
    notifierListener(mail) {
        try {
            let saveFiles = [];
            if (mail.attachments && mail.attachments.length > 0) {
                for (let i = 0; i < mail.attachments.length; i++) {
                    saveFiles.push(this.saveUploadFiles(Buffer.from(mail.attachments[i].content), new Date().getTime() + path.extname(mail.attachments[i].generatedFileName)));
                }
                Promise.all(saveFiles).then(async fileNames => {
                    let filename = await pdfMerger(fileNames);
                    this.jiraIssueCreator.createJiraIssue(mail.subject, mail.text, filename)
                })
            } else {
                //  this.jiraIssueCreator.createJiraIssue(mail.subject, mail.text, null)
            }

        } catch (e) {
            console.log(e);
        }
    }

    async saveUploadFiles(file, fileName) {
        return new Promise((resolve, reject) => {
            fs.writeFile("uploads/" + fileName, file, async (err) => {
                if (!err) {
                    let filePath = await PdfGenrator(fileName);
                    resolve(filePath);
                }
                else {
                    reject(err)
                };
            });
        })
    }

}

module.exports = MailNotiifer