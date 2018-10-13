import { $, $$, ElementFinder, ElementArrayFinder, browser, ExpectedConditions, ProtractorExpectedConditions } from "protractor";

export class LazyGrid {

    container: ElementFinder;
    viewPort: ElementFinder;
    viewPortClass: string;
    headers: ElementArrayFinder;
    rows: ElementArrayFinder;

    constructor() {
        this.container = $('.ag-body-container');
        this.viewPort = $('.ag-body-viewport');
        this.viewPortClass = 'ag-body-viewport';
        this.headers = $$('.ag-header-cell');
        this.rows = $$('.ag-row');
    }

    async waitForGridLoad() {
        await browser.wait(ExpectedConditions.presenceOf($('div.ag-row[row-index="1"]')), 10000);
    }

    async getHeaders(): Promise<{}[]>  {
        return await this.headers.map(header => header.$('.ag-header-cell-text').getText());
    }

    async getContainerHeight(): Promise<number> {
        let width = await this.container.getCssValue('height');
        return parseInt(width.replace('px', ''));
    }

    async verticalScroll() {
        let scrollBy = await this.getBottomEdgeOfLastRow();
        console.log('scrollBy: ' +scrollBy);
        await browser.executeScript(`var x = document.getElementsByClassName("${this.viewPortClass}");
                                    x[0].scrollTop = ${scrollBy};`);
    }

    async getCurrentRowCount(): Promise<number> {
        return await this.rows.count();
    }

    async getBottomEdgeOfLastRow(): Promise<number> {
        let highestRowID = await this.getHighestRowID();
        console.log('highestRowID: ' + highestRowID);
        let lastRow = await this.getRowByIndex(highestRowID);
        let rawStyle = await lastRow.getAttribute('style');
        let bottomEdge = rawStyle.substring(rawStyle.indexOf('(')+1, rawStyle.indexOf(')')).replace('px', '');
        return parseInt(bottomEdge);
    }

    async getRowByIndex(index: number): Promise<ElementFinder> {
        return await this.rows.filter(row => row.getAttribute('row-index').then(rowIndex => parseInt(rowIndex) === index)).first();
    }

    async getHighestRowID(): Promise<number> {
        let rowIDArray: number[] = [];
        let rowIDs = await this.rows.map(async row => rowIDArray.push(parseInt(await row.getAttribute('row-index'))));
        return Math.max(...rowIDArray);
    }


}
