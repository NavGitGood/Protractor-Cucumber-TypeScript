import { binding, given, when, then } from 'cucumber-tsflow';
import { browser } from 'protractor';
import { LazyGrid } from './../page-objects/lazy-grid.po'

const lazyGrid = new LazyGrid();

@binding()
class TestSD {
    @given(/^I open screen$/, null, 10000)
    public async testmethod() {
        await browser.get('https://medium.com/the-node-js-collection/an-update-on-es6-modules-in-node-js-42c958b890c');
    }
}
