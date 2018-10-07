import { $$, ElementFinder, ElementArrayFinder } from "protractor";

export class BasePage {

    tabs: ElementArrayFinder;
    myHerosList: ElementArrayFinder

    constructor() {
        this.tabs = $$('a');
        this.myHerosList = $$('li');
    }

    async getTab(tabValue: string): Promise<ElementFinder> {
        return await this.tabs.filter(tab => tab.getText().then(tabName => tabName === tabValue)).first();
    }

    async getTopHeroesAsArray(): Promise<{}[]> {
        return await this.tabs.map(tab => tab.getText());
    }

    async getMyHeroesAsArray(): Promise<{}[]> {
        let myheroes = await this.myHerosList.map(async myhero => await myhero.$('a').getText());
        return await myheroes.map(myhero => myhero.toString().replace(/[0-9]/g, '').trim());
    }
}
