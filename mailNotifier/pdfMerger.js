const { __esModule } = require('node-fetch');
const PDFMerger = require('pdf-merger-js');

var merger = new PDFMerger();

module.exports = async (filesList) => {
    let fileName = new Date().getTime();
    for (let i = 0; i < filesList.length; i++) {
        merger.add(filesList[i]);
    }
    await merger.save("uploads/" + fileName + ".pdf");
    return "uploads/" + fileName + ".pdf";
}

