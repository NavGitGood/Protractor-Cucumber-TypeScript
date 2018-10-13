import { binding, given, when, then } from 'cucumber-tsflow';
import { browser } from 'protractor';
import { expect } from 'chai';
import { TableDefinition } from 'cucumber';
import { BasePage } from './../page-objects/basepage.po'
import { LazyGrid } from './../page-objects/lazy-grid.po'
import { ServiceTest } from './../page-objects/service-test.po'

const basepage = new BasePage();
const lazyGrid = new LazyGrid();
const serviceTest = new ServiceTest();

@binding()
class CommonSD {

    @given(/^I launch heroes app$/, null, 10000)
    async launchApp() {
        browser.waitForAngularEnabled(false);
        await browser.get('localhost:4200');
    }

    @given(/^I am on home page$/, null, 10000)
    async verifyHome() {
        expect(await browser.getCurrentUrl()).to.contain('http://localhost:4200');
        await browser.waitForAngularEnabled(true);
    }

    @when(/^I click on \"(.*)\"$/, null, 10000)
    async openTab(tab: string) {
        await (await basepage.getTab(tab)).click();
    }

    @then(/^App title should be \"(.*)\"$/, null, 10000)
    async verifyTitle(title: string) {
        await browser.waitForAngularEnabled(true);
        expect(await browser.getTitle()).to.equal(title);
    }

    @then(/^\"(.*)\" resource should be loaded$/, null, 10000)
    async verifyResource(resource: string) {
        expect(await browser.getCurrentUrl()).to.contain(resource);
    }

    @then(/^Top Heroes should be as follows$/, null, 10000)
    async verifyTopHeroes(dataTable: TableDefinition) {
        const heroes = await dataTable.rows();
        const topHeroes = await basepage.getTopHeroesAsArray();
        expect(heroes.every(hero => topHeroes.includes(hero.toString()))).to.be.true;
    }

    @then(/^My Heroes should be as follows$/, null, 10000)
    async verifyMyHeroes(dataTable: TableDefinition) {
        const heroes = await dataTable.rows();
        const myHeroes = await basepage.getMyHeroesAsArray();
        expect(heroes.every(hero => myHeroes.includes(hero.toString()))).to.be.true;
    }

    @then(/^Headers should be as follows$/, null, 10000)
    async verifyGridHeaders(dataTable: TableDefinition) {
        const headers = await dataTable.rows();
        const gridHeader = await lazyGrid.getHeaders();
        expect(headers.every(header => gridHeader.includes(header.toString()))).to.be.true;
    }

    @when(/^I get max row$/, null, 100000)
    async maxRow() {
        expect(await lazyGrid.getHighestRowID()).to.be.equal(26);
    }

    @then(/^All rows should be present$/, null, 100000)
    async allRowsPresent() {
        // expect(await lazyGrid.getHighestRowID()).to.be.equal(26);
    }

    @when(/^I wait for data to load in the grid$/, null, 10000)
    async waitForGridLoad() {
        await lazyGrid.waitForGridLoad();
    }

    @when(/^Rows should equal data length$/, null, 10000)
    async verifyRowCount() {
        expect(await lazyGrid.getTotalRows()).to.equal(await serviceTest.FetchCarsDataLength());
    }

    @when(/^I scroll the grid$/, null, 10000)
    async scrollGrid() {
        await lazyGrid.verticalScroll();
    }
}
