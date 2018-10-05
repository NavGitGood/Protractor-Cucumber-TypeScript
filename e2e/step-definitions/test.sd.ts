import { binding, given, when, then } from 'cucumber-tsflow';
import { browser } from 'protractor';

@binding()
class TestSD {
    @given(/^I open screen$/, null, 10000)
    public async testmethod() {
        await browser.get('https://medium.com/the-node-js-collection/an-update-on-es6-modules-in-node-js-42c958b890c');
    }
}
