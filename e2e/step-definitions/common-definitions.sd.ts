import { binding, given, when, then } from 'cucumber-tsflow';
import { browser } from 'protractor';
import { expect } from 'chai';
import { TableDefinition } from 'cucumber';
import { BasePage } from './../page-objects/basepage.po'
import { LazyGrid } from './../page-objects/lazy-grid.po'

const basepage = new BasePage();
const lazyGrid = new LazyGrid();

@binding()
class CommonSD {

    @given(/^I launch heroes app$/, null, 10000)
    public async launchApp() {
        browser.waitForAngularEnabled(false);
        await browser.get('localhost:4200');
    }

    @given(/^I am on home page$/, null, 10000)
    public async verifyHome() {
        expect(await browser.getCurrentUrl()).to.contain('http://localhost:4200');
        await browser.waitForAngularEnabled(true);
    }

    @when(/^I click on \"(.*)\"$/, null, 10000)
    public async openTab(tab: string) {
        await (await basepage.getTab(tab)).click();
    }

    @then(/^App title should be \"(.*)\"$/, null, 10000)
    public async verifyTitle(title: string) {
        await browser.waitForAngularEnabled(true);
        expect(await browser.getTitle()).to.equal(title);
    }

    @then(/^\"(.*)\" resource should be loaded$/, null, 10000)
    public async verifyResource(resource: string) {
        expect(await browser.getCurrentUrl()).to.contain(resource);
    }

    @then(/^Top Heroes should be as follows$/, null, 10000)
    public async verifyTopHeroes(dataTable: TableDefinition) {
        const heroes = await dataTable.rows();
        const topHeroes = await basepage.getTopHeroesAsArray();
        expect(heroes.every(hero => topHeroes.includes(hero.toString()))).to.be.true;
    }

    @then(/^My Heroes should be as follows$/, null, 10000)
    public async verifyMyHeroes(dataTable: TableDefinition) {
        const heroes = await dataTable.rows();
        const myHeroes = await basepage.getMyHeroesAsArray();
        expect(heroes.every(hero => myHeroes.includes(hero.toString()))).to.be.true;
    }

    @then(/^Headers should be as follows$/, null, 10000)
    public async verifyGridHeaders(dataTable: TableDefinition) {
        const headers = await dataTable.rows();
        const gridHeader = await lazyGrid.getHeaders();
        expect(headers.every(header => gridHeader.includes(header))).to.be.true;
    }
}
