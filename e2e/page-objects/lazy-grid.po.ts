import { $, $$, ElementFinder, ElementArrayFinder } from "protractor";

export class LazyGrid {

    viewPort: ElementFinder;
    headers: ElementArrayFinder;
    rows: ElementArrayFinder;

    constructor() {
        this.viewPort = $('ag-body-viewport');
        this.headers = $$('.ag-header-cell');
        this.rows = $$('.ag-row');
    }

    async getHeaders(): Promise<{}[]>  {
        return await this.headers.map(header => header.$('.ag-header-cell-text').getText());
    }

}
