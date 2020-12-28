const { PDFNet } = require('@pdftron/pdfnet-node');
let path = require("path");
let fs = require("fs");
module.exports = function (fileName) {
    return new Promise((resolve, reject) => {
        let name = fileName.split(".");
        const main = async () => {
            const newDoc = await PDFNet.PDFDoc.create();
            await newDoc.initSecurityHandler();
            await PDFNet.Convert.toPdf(newDoc, "uploads/" + fileName);
            newDoc.save("uploads/" + name[0] + "." + "pdf", PDFNet.SDFDoc.SaveOptions.e_linearized);
        };
        PDFNet.runWithCleanup(main).catch(function (error) {
            console.log('Error: ' + JSON.stringify(error));
            reject(error);

        }).then(async function () {
            resolve("uploads/" + name[0] + "." + "pdf");
            PDFNet.shutdown()
        });

    })

}