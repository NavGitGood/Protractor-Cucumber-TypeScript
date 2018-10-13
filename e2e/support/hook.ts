import { After, Status} from 'cucumber';
import { browser } from 'protractor';
import * as fs from 'fs';
import * as mkdir from 'mkdirp';

const imgPath = require('../../protractor.conf.js').config.reportPath + '/screenshots';

function saveScreenshot(data, fileName) {
    mkdir.sync(imgPath);
    const stream = fs.createWriteStream(imgPath + '/' + fileName);
    stream.write(Buffer.from(data, 'base64'));
    stream.end();
}

After(async function(scenario) {
    if (scenario.result.status === Status.FAILED) {
        const image = await browser.takeScreenshot();
        this.attach(image, 'image/png');
        const imgName = scenario.pickle.name.split(' ').join('_');
        saveScreenshot(image, imgName + '.png');
    }
});