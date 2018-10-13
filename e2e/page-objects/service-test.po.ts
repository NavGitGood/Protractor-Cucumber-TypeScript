let fetch =  require("isomorphic-fetch");

export class ServiceTest {
    async FetchCarsDataLength(): Promise<number> {
        let length: number;
        await fetch('https://api.myjson.com/bins/15psn9')
        .then(async result => await result.json())
        .then(async rowData => length = rowData.length);
        return length;
    }
}
